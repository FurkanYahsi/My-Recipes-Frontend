import React, { useEffect, useState } from 'react';
import { createComment, getMainComments, getReplies } from '../../services/RecipeServices/RecipeService.export';
import { ToastMessage } from '../../utils/ToastMessage/ToastMessage';

export interface Comment {
    id: string;
    content: string;
    username: string;
    user_name: string;
    user_surname: string;

    created_at: string;
    parent_comment_id: string;
    user_id: string;
    recipe_id: string;
    like_count: number;
    is_liked: boolean;
}

const useComments = (recipeId: string) => {
    const { contextHolder, showNotification } = ToastMessage();
    const commentRef = React.useRef<HTMLTextAreaElement>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [page, setPage] = useState(2);    
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [whichCommentsRepliesWillBeViewed, setWhichCommentsRepliesWillBeViewed] = useState<string[] | null>(null);
    const [replies, setReplies] = useState<{ [commentId: string]: Comment[] }>({});

    const handleCreateComment = (e: React.FormEvent<HTMLFormElement>, parentCommentId?: string) => {
        e.preventDefault(); // Prevent page refresh
        
        if (!commentRef.current?.value.trim()) {
            showNotification("Please enter a comment before submitting.", "error");
            if (commentRef.current) commentRef.current.value = '';
            return;
        }
        
        createComment(recipeId, commentRef.current.value, replyingTo || parentCommentId)
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
                    console.log("Comments loaded successfully:", response.data);
                }
            })
            .catch(error => {
                console.error("Failed to load comments:", error);
            });
    }, []);

    const handleViewReplies = (commentId: string) => {
        if (whichCommentsRepliesWillBeViewed?.includes(commentId)) {
            setWhichCommentsRepliesWillBeViewed(prev => prev?.filter(id => id !== commentId) || null);
            return;
        }

        setWhichCommentsRepliesWillBeViewed(prev => prev ? [...prev, commentId] : [commentId]);

        getReplies(commentId, 5) // Fetch replies for the comment with a limit of 5
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

    const handleLikeClick = (commentId: string) => {

        console.log(`Liked comment with ID: ${commentId}`);
    }

    return {
        handleCreateComment,
        commentRef,
        contextHolder,
        comments,
        handleViewReplies,
        replyingTo,
        handleReplyClick,
        handleLikeClick,
        whichCommentsRepliesWillBeViewed,
        replies,
    }
}

export default useComments
