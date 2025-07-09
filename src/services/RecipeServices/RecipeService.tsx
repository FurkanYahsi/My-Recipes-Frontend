import { RequestMethod } from "../../enums/RequestMethod";
import { makeRequest } from "../../axios/ApiService";

const endpoints: any = {
    createRecipe: '/recipe/create',
    likeOrUnlikeRecipe: (recipeId: string) => `/recipe/${recipeId}/like-or-unlike`
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
}

export default new RecipeService();