import {RequestMethod} from "../../enums/RequestMethod";
import { makeRequest } from "../../axios/ApiService";

const endpoints: any = {
    logout: '/auth/logout',
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up'
}

class AuthService {
    async logout(): Promise<{ data: any, success: boolean }> {        
        return makeRequest(RequestMethod.POST, endpoints.logout)
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            }); 
    }

    async signIn(values:any): Promise<{ data: any, success: boolean }> {        
        return makeRequest(RequestMethod.POST, endpoints.signIn, {data:values})
            .then(result => {
                console.log(result)
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
}

export default new AuthService();
