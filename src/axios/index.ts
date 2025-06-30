import axios, {CancelTokenSource} from 'axios';
import axiosInstance from './axiosInstance';

type RequestMethodTypes = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface MakeRequestOptions {
    headers?: Record<string, string>;
    data?: any;
    params?: any;
    returnAllResponse?: boolean;
    cancelToken?: CancelTokenSource; // Add this line
}

let BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001/';
if (!BASE_URL) {
  document.getElementById('access_token')?.remove();
}

interface IRequestResponse {
    data: any,
    success: boolean,
    error: boolean,
    errorMessage: string | null
}


async function makeRequest(
    method: RequestMethodTypes,
    endpoint: string,
    options: MakeRequestOptions = {}
) {
    try {
        const response = await axiosInstance({
            method: method,
            url: `${BASE_URL}${endpoint}`,
            headers: options.headers,
            data: options.data,
            params: options.params,
            cancelToken: options.cancelToken?.token
        });
        if (options.returnAllResponse) {
            return response;
        } else {
            let res: IRequestResponse = {data: response.data, success: true, error: false, errorMessage: null};
            return res;
        }

    } catch (error: any) {

        if (axios.isAxiosError(error) && error.response?.status === 401) {
            // 401 Unauthorized hatası
            throw new Error('Yetkisiz erişim. Lütfen giriş yapın.');
        }

        if (error.response && error.response.status === 401) { // AUTH FAILED!
            console.log("AUTH FAILED!")
           document.getElementById("access_token")?.remove();
        }
        let tmpData: any = error?.response?.data?.data !== null ? error?.response?.data?.data : null;
        let res: IRequestResponse = {
            data: tmpData,
            success: false,
            error: true,
            errorMessage: error?.response?.data?.error
        };
        return res
    }
}

export default makeRequest;
