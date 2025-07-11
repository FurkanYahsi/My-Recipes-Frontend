import React, { useState } from 'react'
import { createComment } from '../../services/RecipeServices/RecipeService.export';
import { ToastMessage } from '../../utils/ToastMessage/ToastMessage';

const useComments = (recipeId: string, parentCommentId: string | null = null) => {
    const { contextHolder, showNotification } = ToastMessage();
    const commentRef = React.useRef<HTMLTextAreaElement>(null);
    
    // const [replyingTo, setReplyingTo] = useState<string | null>(null);

    const handleCreateComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent page refresh
        
        if (!commentRef.current?.value.trim()) {
            showNotification("Please enter a comment before submitting.", "error");
            if (commentRef.current) commentRef.current.value = '';
            return;
        }
        
        createComment(recipeId, commentRef.current?.value, /*replyingTo || */parentCommentId)
            .then(response => {
                if (response.success) {
                    showNotification("Comment added successfully!", "success");
                    if (commentRef.current) commentRef.current.value = '';
                    // if (replyingTo) setReplyingTo(null);
                } else {
                    showNotification("Failed to add comment. Please try again.", "error");
                }
            })
            .catch(error => {
                console.error("Error adding comment:", error);
                showNotification("Failed to add comment. Please try again.", "error");
            });
    }

    // const handleReplyClick = (commentId: string) => {
    //     setReplyingTo(commentId);
    // }

    return {
        handleCreateComment,
        commentRef,
        contextHolder,
        // replyingTo,
        // handleReplyClick,
    }
}

export default useComments
