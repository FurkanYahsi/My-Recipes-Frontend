import { RequestMethod } from "../../enums/RequestMethod";
import { makeRequest } from "../../axios/ApiService";

const endpoints: any = {
    createRecipe: '/recipe/create',
    likeOrUnlikeRecipe: (recipeId: string) => `/recipe/${recipeId}/like-or-unlike`,
    bookmarkOrRemoveBookmarkTheRecipe: (recipeId: string) => `/recipe/${recipeId}/bookmark-or-remove-bookmark`,
    getTrends: (period: string) => `/recipe/trends/${period}`,
    getRecipeById: (recipeId: string) => `/recipe/${recipeId}`,
    createComment: (recipeId: string) => `/recipe/${recipeId}/comment/create`,
    getComments: (recipeId: string) => `/recipe/${recipeId}/comments`,
    getReplies: (commentId: string) => `/recipe/comment/${commentId}/replies`,
    getRootCommentReplies: (commentId: string) => `/recipe/comment/${commentId}/root-replies`,
    likeOrUnlikeComment: (commentId: string) => `/recipe/comment/${commentId}/like-or-unlike`
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
        return makeRequest(RequestMethod.GET, `/recipe/category/${category}`, { params: { page, limit } })
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }
    async getRecipesByType(type: string, page: number, limit?: number): Promise<{ data: any, success: boolean }> {
        return makeRequest(RequestMethod.GET, `/recipe/type/${type}`, { params: { page, limit } })
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }
    async getSavedRecipes(page: number, limit?: number): Promise<{ data: any, success: boolean }> {
        return makeRequest(RequestMethod.GET, '/recipe/saved-recipes', { params: { page, limit } })
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }
    async getLikedRecipes(page: number, limit?: number): Promise<{ data: any, success: boolean }> {
        return makeRequest(RequestMethod.GET, '/recipe/liked-recipes', { params: { page, limit } })
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }
    async createComment(recipeId: string, content: string, parentCommentId: string | null = null,  rootCommentId: string | null = null): Promise<{ data: any, success: boolean }> {
    return makeRequest(
        RequestMethod.POST, 
        endpoints.createComment(recipeId), 
        { 
            data: { 
                content,
                parent_comment_id: parentCommentId,
                root_comment_id: rootCommentId
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
        return makeRequest(RequestMethod.GET, endpoints.getReplies(commentId), {params: {limit}})
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }
    async getRootCommentReplies(commentId: string, limit?: number, page?: number): Promise<{ data: any, success: boolean }> {
        return makeRequest(RequestMethod.GET, endpoints.getRootCommentReplies(commentId), {params: {limit, page}})
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }
    async likeOrUnlikeComment(commentId: string): Promise<{ data: any, success: boolean }> {
        return makeRequest(RequestMethod.POST, endpoints.likeOrUnlikeComment(commentId))
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }
}

export default new RecipeService();