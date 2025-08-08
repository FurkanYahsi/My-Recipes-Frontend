import { RequestMethod } from "../../enums/RequestMethod";
import { makeRequest } from "../../axios/ApiService";


const endpoints: any = {
    createComment: (recipeId: string) => `/comment/${recipeId}/comment/create`,
    getComments: (recipeId: string) => `/comment/${recipeId}/comments`,
    getReplies: (commentId: string) => `/comment/comment/${commentId}/replies`,
    getRootCommentReplies: (commentId: string) => `/comment/comment/${commentId}/root-replies`,
    likeOrUnlikeComment: (commentId: string) => `/comment/comment/${commentId}/like-or-unlike`
}

class CommentService {

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
export default new CommentService();