import CommentService from "./CommentService";

export const createComment = (
    recipeId: string, 
    content: string, 
    parentCommentId: string | null = null,
    rootCommentId: string | null = null
): Promise<{success: boolean, data: any}> => {
    return new Promise((resolve, reject) => {
        CommentService.createComment(recipeId, content, parentCommentId, rootCommentId)
            .then((response) => {
                const commentData = response.data || {};
                resolve({
                    success: true,
                    data: commentData
                });
            })
            .catch((err) => {
                console.error("Error creating comment:", err);
                resolve({ success: false, data: {} });
            });
    });
}

export const getMainComments = (recipeId: string, page: number, limit?: number): Promise<{success: boolean, data: any}> => {
    return new Promise((resolve, reject) => {
        CommentService.getMainComments(recipeId, page, limit)
        .then((response) => {
            const commentData = response.data?.data || [];
            resolve({
                success: true,
                data: commentData
            });
            
        })
        .catch((err) => {
                console.error(err);
                resolve({
                    success: false,
                    data: {}
                });
        });
    });
}

export const getReplies = (commentId: string, limit?: number): Promise<{success: boolean, data: any}> => {
    return new Promise((resolve, reject) => {
        CommentService.getReplies(commentId, limit)
            .then((response) => {
                const repliesData = response.data?.data || [];
                resolve({
                    success: true,
                    data: repliesData
                });
            })
            .catch((err) => {
                console.error("Error fetching replies:", err);
                resolve({ success: false, data: [] });
            });
    });
}

export const getRootCommentReplies = (commentId: string, limit?: number, page?: number): Promise<{success: boolean, data: any}> => {
    return new Promise((resolve, reject) => {
        CommentService.getRootCommentReplies(commentId, limit, page)
            .then((response) => {
                const repliesData = response.data?.data || [];
                resolve({
                    success: true,
                    data: repliesData
                });
            })
            .catch((err) => {
                console.error("Error fetching root comment replies:", err);
                resolve({ success: false, data: [] });
            });
    });
}

export const likeOrUnlikeComment = (commentId: string): Promise<{success: boolean, data: any}> => {
    return new Promise((resolve, reject) => {
        CommentService.likeOrUnlikeComment(commentId)
            .then((response) => {
                const likeData = response.data || {};
                resolve({
                    success: true,
                    data: likeData
                });
            })
            .catch((err) => {
                console.error("Error liking/unliking comment:", err);
                resolve({ success: false, data: {} });
            });
    });
}