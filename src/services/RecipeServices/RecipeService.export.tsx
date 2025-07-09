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