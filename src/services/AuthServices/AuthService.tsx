import {RequestMethod} from "../../enums/RequestMethod";
import makeRequest from "../../axios";

const endpoints: any = {
    logout: '/auth/logout',
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
}

export default new AuthService();
