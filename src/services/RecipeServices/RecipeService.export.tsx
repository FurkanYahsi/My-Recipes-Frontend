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
    parentCommentId: string | null = null
): Promise<{success: boolean, data: any}> => {
    return new Promise((resolve, reject) => {
        RecipeService.createComment(recipeId, content, parentCommentId)
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