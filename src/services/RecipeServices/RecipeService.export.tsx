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

export const getRecipeByCategory = (category: string, page: number, limit?: number): Promise<any[] | null> => {

    return new Promise((resolve, reject) => {
        RecipeService.getRecipeByCategory(category, page, limit)
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

export const getRecipesByType = (type: string, page: number, limit?: number): Promise<any[] | null> => {

    return new Promise((resolve, reject) => {
        RecipeService.getRecipesByType(type, page, limit)
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

export const getTrendRecipes = (period: string, page?: number, limit?: number): Promise<{success: boolean, data: any}> => {
    return new Promise((resolve, reject) => {
        RecipeService.getTrendRecipes(period, page, limit)
            .then((response) => {
                const result = response.data || { recipes: [], total: 0 };
                
                resolve({
                    success: true,
                    data: result
                });
            })
            .catch((err) => {
                console.error(err);
                resolve({ success: false, data: { recipes: [], total: 0 } });
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

export const getSavedRecipes = (page: number, limit?: number): Promise<{success: boolean, data: any}> => {
    return new Promise((resolve, reject) => {
        RecipeService.getSavedRecipes(page, limit)
            .then((response) => {
                const savedRecipesData = response.data?.data || [];
                resolve({
                    success: true,
                    data: savedRecipesData
                });
            })
            .catch((err) => {
                console.error("Error fetching saved recipes:", err);
                resolve({ success: false, data: [] });
            });
    });
}

export const getLikedRecipes = (page: number, limit?: number): Promise<{success: boolean, data: any}> => {
    return new Promise((resolve, reject) => {
        RecipeService.getLikedRecipes(page, limit)
            .then((response) => {
                const likedRecipesData = response.data?.data || [];
                resolve({
                    success: true,
                    data: likedRecipesData
                });
            })
            .catch((err) => {
                console.error("Error fetching liked recipes:", err);
                resolve({ success: false, data: [] });
            });
    });
}