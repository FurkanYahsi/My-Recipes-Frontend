import { RequestMethod } from "../../enums/RequestMethod";
import { makeRequest } from "../../axios/ApiService";

const endpoints: any = {
    createRecipe: '/recipe/create',
    likeOrUnlikeRecipe: (recipeId: string) => `/recipe/${recipeId}/like-or-unlike`,
    bookmarkOrRemoveBookmarkTheRecipe: (recipeId: string) => `/recipe/${recipeId}/bookmark-or-remove-bookmark`,
    getTrends: '/recipe/trends',
    getRecipeById: (recipeId: string) => `/recipe/${recipeId}`,
};

class RecipeService {
    async createRecipe(values: any): Promise<{ data: any, success: boolean }> {
        return makeRequest(RequestMethod.POST, endpoints.createRecipe, { data: values })
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }
    async likeOrUnlikeRecipe(recipeId: string): Promise<{ data: any, success: boolean }> {
        return makeRequest(RequestMethod.POST, endpoints.likeOrUnlikeRecipe(recipeId))
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }
    async addBookmarkOrRemoveBookmarkTheRecipe(recipeId: string): Promise<{data: any, success: boolean}> {
        return makeRequest(RequestMethod.POST, endpoints.bookmarkOrRemoveBookmarkTheRecipe(recipeId))
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }
    async getTrendRecipes(): Promise<{ data: any, success: boolean }> {
        return makeRequest(RequestMethod.GET, endpoints.getTrends)
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }
    async getRecipeById(recipeId: string): Promise<{ data: any, success: boolean }> {
        return makeRequest(RequestMethod.GET, endpoints.getRecipeById(recipeId))
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }
}

export default new RecipeService();