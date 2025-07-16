import { RequestMethod } from "../../enums/RequestMethod";
import { makeRequest } from "../../axios/ApiService";

const endpoints: any = {
    createRecipe: '/recipe/create',
    likeOrUnlikeRecipe: (recipeId: string) => `/recipe/${recipeId}/like-or-unlike`,
    bookmarkOrRemoveBookmarkTheRecipe: (recipeId: string) => `/recipe/${recipeId}/bookmark-or-remove-bookmark`,
    getTrends: '/recipe/trends',
    getRecipeById: (recipeId: string) => `/recipe/${recipeId}`,
    createComment: (recipeId: string) => `/recipe/${recipeId}/comment/create`,
    getComments: (recipeId: string) => `/recipe/${recipeId}/comments`
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
    async createComment(recipeId: string, content: string, parentCommentId: string | null = null): Promise<{ data: any, success: boolean }> {
    return makeRequest(
        RequestMethod.POST, 
        endpoints.createComment(recipeId), 
        { 
            data: { 
                content,
                parent_comment_id: parentCommentId 
            } 
        }
    )
    .then(result => {
        return result;
    })
    .catch(error => {
        return error;
    });
    }
    async getMainComments(recipeId: string, page: number, limit?: number): Promise<{ data: any, success: boolean }> {
        return makeRequest(RequestMethod.GET, endpoints.getComments(recipeId), {params: {page, limit}})
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });        
    }
    async getReplies(commentId: string, limit?: number): Promise<{ data: any, success: boolean }> {
        return makeRequest(RequestMethod.GET, `/comment/${commentId}/replies`, {params: {limit}})
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }
}

export default new RecipeService();