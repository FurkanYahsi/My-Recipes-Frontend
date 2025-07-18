import React, { useEffect, useState } from 'react';
import { createComment, getMainComments, getReplies, getRootCommentReplies, likeOrUnlikeComment, getRecipeById } from '../../services/RecipeServices/RecipeService.export';
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
    user_id: string;
    recipe_id: string;
    like_count: number;
    is_liked: boolean;
}

const useComments = (recipeId: string) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentCount, setCommentCount] = useState(0);
    const [page, setPage] = useState(1);
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [whichCommentsRepliesWillBeViewed, setWhichCommentsRepliesWillBeViewed] = useState<string[] | null>(null);
    const [replies, setReplies] = useState<{ [commentId: string]: Comment[] }>({});
    const commentRef = React.useRef<HTMLTextAreaElement>(null);
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
        showNotification("Please enter a reply comment.", "error");
        return;
    }
        
        createComment(recipeId, commentRef.current.value, replyingTo || parentCommentId, rootCommentId)
            .then(response => {
                if (response.success) {
                    showNotification("Comment added successfully!", "success");
                    if (commentRef.current) commentRef.current.value = '';
                    if (replyingTo) setReplyingTo(null);
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
        getMainComments(recipeId, page, 8) // In one page, there can be at most 8 main comment.
            .then(response => {
                if (response.success) {
                    setComments(response.data);
                }
            })
            .catch(error => {
                console.error("Failed to load comments:", error);
            });
    }, [page]);

    const handleViewReplies = (commentId: string) => {
        if (whichCommentsRepliesWillBeViewed?.includes(commentId)) {
            setWhichCommentsRepliesWillBeViewed(prev => prev?.filter(id => id !== commentId) || null);
            return;
        }

        setWhichCommentsRepliesWillBeViewed(prev => prev ? [...prev, commentId] : [commentId]);

        getRootCommentReplies(commentId, 6, 1) // Fetch replies for the comment with a limit of 5
            .then(response => {
                if (response.success) {
                    setReplies(prev => ({
                        ...prev,
                        [commentId]: response.data
                    }));
                } else {
                    showNotification("Failed to load replies. Please try again.", "error");
                }
            })
            .catch(error => {
                console.error("Error fetching replies:", error);
                showNotification("Failed to load replies. Please try again.", "error");
            });
    }

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
    }, [recipeId]);

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

    return {
        comments,
        replies,
        replyingTo,
        whichCommentsRepliesWillBeViewed,
        commentCount,
        commentRef,
        page,
        contextHolder,
        handleReplyClick,
        handleLikeClick,
        handleViewReplies,
        handleCreateComment,
        handleNextPage,
        handlePreviousPage
    }
}

export default useComments
