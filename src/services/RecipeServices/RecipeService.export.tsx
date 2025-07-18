import RecipeService from "../RecipeServices/RecipeService";

export const createRecipe = (values: any): Promise<any[] | null> => {

    return new Promise((resolve, reject) => {
        RecipeService.createRecipe(values)
            .then((response) => {
                const apiData: any = response;
                resolve(apiData);
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
}

export const likeOrUnlikeRecipe = (recipeId: string): Promise<any[] | null> => {

    return new Promise((resolve, reject) => {
        RecipeService.likeOrUnlikeRecipe(recipeId)
            .then((response) => {
                const apiData: any = response;
                resolve(apiData);
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
}

export const addBookmarkOrRemoveBookmarkTheRecipe = (recipeId: string): Promise<any[] | null> => {

    return new Promise((resolve, reject) => {
        RecipeService.addBookmarkOrRemoveBookmarkTheRecipe(recipeId)
            .then((response) => {
                const apiData: any = response;
                resolve(apiData);
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
}

export const getTrendRecipes = (): Promise<{success: boolean, data: any[]}> => {

    return new Promise((resolve, reject) => {
        RecipeService.getTrendRecipes()
            .then((response) => {
                const recipesArray = response.data?.data || [];                
                resolve({
                    success: true,
                    data: recipesArray 
                });
            })
            .catch((err) => {
                console.error(err);
                resolve({ success: false, data: [] });
            });
    });
}

export const getRecipeById = (recipeId: string): Promise<{success: boolean, data: any}> => {

    return new Promise((resolve, reject) => {
        RecipeService.getRecipeById(recipeId)
            .then((response) => {
                const recipeData = response.data?.data || {};
                resolve({
                    success: true,
                    data: recipeData
                });
            })
            .catch((err) => {
                console.error(err);
                resolve({ success: false, data: {} });
            });
    });
}

export const createComment = (
    recipeId: string, 
    content: string, 
    parentCommentId: string | null = null,
    rootCommentId: string | null = null
): Promise<{success: boolean, data: any}> => {
    return new Promise((resolve, reject) => {
        RecipeService.createComment(recipeId, content, parentCommentId, rootCommentId)
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
        RecipeService.getMainComments(recipeId, page, limit)
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
        RecipeService.getReplies(commentId, limit)
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
        RecipeService.getRootCommentReplies(commentId, limit, page)
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
        RecipeService.likeOrUnlikeComment(commentId)
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