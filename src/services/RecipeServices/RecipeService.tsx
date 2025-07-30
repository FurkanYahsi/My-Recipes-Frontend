import { RequestMethod } from "../../enums/RequestMethod";
import { makeRequest } from "../../axios/ApiService";

const endpoints: any = {
    // Recipes
    createRecipe: '/recipe/create',
    likeOrUnlikeRecipe: (recipeId: string) => `/recipe/${recipeId}/like-or-unlike`,
    bookmarkOrRemoveBookmarkTheRecipe: (recipeId: string) => `/recipe/${recipeId}/bookmark-or-remove-bookmark`,
    getTrends: (period: string) => `/recipe/trends/${period}`,
    getRecipeById: (recipeId: string) => `/recipe/${recipeId}`,
    getRecipeByCategory: (category: string) => `/recipe/category/${category}`,
    getRecipesByType: (type: string) => `/recipe/type/${type}`,
    getSavedRecipes: `/recipe/saved-recipes`,
    getLikedRecipes: `/recipe/liked-recipes`,

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
    async getTrendRecipes(period: string, page?: number, limit?: number): Promise<{ data: any, success: boolean }> {
        return makeRequest(RequestMethod.GET, endpoints.getTrends(period), { params: { page, limit } })
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
    async getRecipeByCategory(category: string, page: number, limit?: number): Promise<{ data: any, success: boolean }> {
        return makeRequest(RequestMethod.GET, endpoints.getRecipeByCategory(category), { params: { page, limit } })
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }
    async getRecipesByType(type: string, page: number, limit?: number): Promise<{ data: any, success: boolean }> {
        return makeRequest(RequestMethod.GET, endpoints.getRecipesByType(type), { params: { page, limit } })
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }
    async getSavedRecipes(page: number, limit?: number): Promise<{ data: any, success: boolean }> {
        return makeRequest(RequestMethod.GET, endpoints.getSavedRecipes, { params: { page, limit } })
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }
    async getLikedRecipes(page: number, limit?: number): Promise<{ data: any, success: boolean }> {
        return makeRequest(RequestMethod.GET, endpoints.getLikedRecipes, { params: { page, limit } })
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }
}
export default new RecipeService();