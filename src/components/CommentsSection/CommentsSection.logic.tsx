import React, { useEffect, useState } from 'react';
import { createComment, getMainComments, getRootCommentReplies, likeOrUnlikeComment, getRecipeById } from '../../services/RecipeServices/RecipeService.export';
import { ToastMessage } from '../../utils/ToastMessage/ToastMessage';

export interface Comment {
    id: string;
    content: string;
    username: string;
    user_name: string;
    user_surname: string;
    created_at: string;
    parent_comment_id: string;
    root_comment_id: string | null;
    reply_count: number;
    recipe_id: string;
    like_count: number;
    is_liked: boolean;

    user_id: string;
}

const useComments = (recipeId: string) => {

    const howManyCommentsPerPage = 8; // Maximum number of main comments per page
    const howManyRepliesPerComment = 6; // Maximum number of replies per comment

    // About main comments
    const [comments, setComments] = useState<Comment[]>([]); // All the main comments of viewed recipe
    const [commentCount, setCommentCount] = useState(0); // Total number of main comments of viewed recipe
    const [page, setPage] = useState(1); // For pagination of main comments
    const commentRef = React.useRef<HTMLTextAreaElement>(null); // Reference to the comment input field
    const [didNewCommentCreated, setDidNewCommentCreated] = useState(0);

    // About replies
    const [replyPages, setReplyPages] = useState<{ [commentId: string]: number }>({}); // Keeps track of the page number for each comment's replies
    const [hasMoreReplies, setHasMoreReplies] = useState<{[commentId: string]: boolean}>({}); // Keeps track of whether there are more replies to load for each comment
    const [replyingTo, setReplyingTo] = useState<string | null>(null); // The comment ID that the user is replying to
    const [whichCommentsRepliesWillBeViewed, setWhichCommentsRepliesWillBeViewed] = useState<string[] | null>(null); // Keeps track of which comments' replies are currently being viewed
    const [replies, setReplies] = useState<{ [commentId: string]: Comment[] }>({}); // All the replies for each comment ID
    
    //Toast message
    const { contextHolder, showNotification } = ToastMessage();

    const handleCreateComment = (e: React.FormEvent<HTMLFormElement>, parentCommentId?: string, rootCommentId?: string) => {
        e.preventDefault(); // Prevent page refresh

        const usernamePattern = new RegExp(`^@\\w+\\s*$`);
        
        if (!commentRef.current?.value.trim()) {
            showNotification("Please enter a comment before submitting.", "error");
            if (commentRef.current) commentRef.current.value = '';
            return;
        }

        if (usernamePattern.test(commentRef.current?.value.trim())) {
            showNotification("Please enter a comment before submitting.", "error");
        return;
    }
        
        createComment(recipeId, commentRef.current.value, replyingTo || parentCommentId, rootCommentId)
            .then(response => {
                if (response.success) {
                    showNotification("Comment added successfully!", "success");
                    if (commentRef.current) commentRef.current.value = '';
                    if (replyingTo) setReplyingTo(null);
                    setDidNewCommentCreated(prev => prev + 1); 
                } else {
                    showNotification("Failed to add comment. Please try again.", "error");
                }
            })
            .catch(error => {
                console.error("Error adding comment:", error);
                showNotification("Failed to add comment. Please try again.", "error");
            });
    }

    useEffect(()=> {
        getMainComments(recipeId, page, howManyCommentsPerPage) // In one page, there can be at most 8 main comment.
            .then(response => {
                if (response.success) {
                    setComments(response.data);
                }
            })
            .catch(error => {
                console.error("Failed to load comments:", error);
            });
    }, [page, didNewCommentCreated]);

    const handleReplyClick = (commentId: string) => {
        setReplyingTo(commentId);
    }

    const handleLikeClick = (commentId: string, type: 'main' | 'reply' = 'main', parentId?: string) => {

        likeOrUnlikeComment(commentId)
            .then(response => {
                if (response.success) {
                    if (type === 'main') {
                    setComments(comments => 
                        comments.map(comment => comment.id === commentId
                            ? {...comment, is_liked: !comment.is_liked, like_count: Number(comment.like_count) + (!comment.is_liked ? 1 : -1)}
                            : comment)
                    );
                } else if (type === 'reply' && parentId) {
                    setReplies(replies => ({
                        ...replies,
                        [parentId]: replies[parentId]?.map(reply => reply.id === commentId
                            ? {...reply, is_liked: !reply.is_liked, like_count: Number(reply.like_count) + (!reply.is_liked ? 1 : -1)}
                            : reply) || []
                    }));
                }
                }
            })
    }

    useEffect(() => {
        getRecipeById(recipeId).then(response => {
            if (response.success) {
                setCommentCount(response.data.main_comment_count);
            } else {
                setCommentCount(0);
            }
        });
    }, [recipeId, didNewCommentCreated]);

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const handleNextPage = () => {
        const lastPage = Math.ceil(commentCount / 8);
        if (page >= lastPage) return;
        setPage(page + 1);
    };

    const handleViewReplies = (commentId: string) => {
        if (whichCommentsRepliesWillBeViewed?.includes(commentId)) {
            setWhichCommentsRepliesWillBeViewed(previousComments => previousComments?.filter(id => id !== commentId) || null);
            return;
        }  
        loadReplies(commentId, 1, true);
    };

    const handleViewMoreReplies = (commentId: string) => {
        const nextPage = (replyPages[commentId] || 1) + 1;
        loadReplies(commentId, nextPage, false);
    };

    const loadReplies = (commentId: string, pageNumber: number, isFirstLoad: boolean = false) => {
        getRootCommentReplies(commentId, howManyRepliesPerComment + 1, pageNumber)
            .then(response => {
              if (response.success) {
                const hasMore = response.data.length > howManyRepliesPerComment;
                const newReplies = response.data.slice(0, howManyRepliesPerComment);
                // If it's the first load, reset the replies for this comment
                setReplies(prev => ({ ...prev, [commentId]: isFirstLoad ? newReplies : [...(prev[commentId] || []), ...newReplies] }));
                // Update the state for which comments' replies are being viewed
                setHasMoreReplies(prev => ({ ...prev, [commentId]: hasMore }));
                // Update the page number for this comment's replies
                setReplyPages(prev => ({ ...prev, [commentId]: pageNumber }));
                if (isFirstLoad) {
                    setWhichCommentsRepliesWillBeViewed(previousComments => previousComments ? [...previousComments, commentId] : [commentId]);
                }
              } else {
                showNotification("Failed to load replies.", "error");
              }
            })
            .catch(error => {
              console.error("Error loading replies:", error);
              showNotification("Failed to load replies.", "error");
            });
    };

    return {
        comments,
        replies,
        replyingTo,
        whichCommentsRepliesWillBeViewed,
        commentCount,
        commentRef,
        page,
        contextHolder,
        replyPages,
        handleViewMoreReplies,
        handleReplyClick,
        handleLikeClick,
        handleViewReplies,
        hasMoreReplies,
        handleCreateComment,
        handleNextPage,
        handlePreviousPage
    }
}

export default useComments