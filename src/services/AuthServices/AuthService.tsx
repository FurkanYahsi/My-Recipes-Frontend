import {RequestMethod} from "../../enums/RequestMethod";
import { makeRequest } from "../../axios/ApiService";

const endpoints: any = {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    logout: '/auth/logout',
    checkAuth: '/auth/check-auth',
    changeRole: '/auth/change-role',
    isAdmin: '/auth/is-admin',
    isEditor: '/auth/is-editor',
}

class AuthService {

    async signIn(values:any): Promise<{ data: any, success: boolean }> {        
        return makeRequest(RequestMethod.POST, endpoints.signIn, {data:values})
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            }); 
    }

    async signUp(values:any): Promise<{ data:any, success:boolean}> {
        return makeRequest(RequestMethod.POST, endpoints.signUp, {data:values})
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    async logout(): Promise<{ data: any, success: boolean }> {        
        return makeRequest(RequestMethod.POST, endpoints.logout)
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            }); 
    }

    async checkAuth(): Promise<{ data: any, success: boolean }> {
        return makeRequest(RequestMethod.GET, endpoints.checkAuth)
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    async changeRole(userId: string, newRole: string): Promise<{ data: any, success: boolean }> {
        return makeRequest(RequestMethod.POST, endpoints.changeRole, {data:{ userId, newRole }})
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    async isAdmin(): Promise<{ data: any, success: boolean }> {
        return makeRequest(RequestMethod.GET, endpoints.isAdmin)
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    async isEditor(): Promise<{ data: any, success: boolean }> {
        return makeRequest(RequestMethod.GET, endpoints.isEditor)
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }
}

export default new AuthService();
