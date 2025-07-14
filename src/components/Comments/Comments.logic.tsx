import React, { useEffect, useState } from 'react'
import { createComment, getMainComments } from '../../services/RecipeServices/RecipeService.export';
import { ToastMessage } from '../../utils/ToastMessage/ToastMessage';

export interface Comment {
    id: string;
    content: string;
}

const useComments = (recipeId: string, parentCommentId: string | null = null) => {
    const { contextHolder, showNotification } = ToastMessage();
    const commentRef = React.useRef<HTMLTextAreaElement>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [page, setPage] = useState(1);

    
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

    
    useEffect(()=> {
        getMainComments(recipeId, page, 8) // In one page, there can be at most 8 main comment.
            .then(response => {
                if (response.success) {
                    setComments(response.data);
                }
            })
            .catch(error=> {
                console.error("Failed to load comments:", error);
            })
    }, [])
        
    

    // const handleReplyClick = (commentId: string) => {
    //     setReplyingTo(commentId);
    // }

    return {
        handleCreateComment,
        commentRef,
        contextHolder,
        comments
        // replyingTo,
        // handleReplyClick,
    }
}

export default useComments
