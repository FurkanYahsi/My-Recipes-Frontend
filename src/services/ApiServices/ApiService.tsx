// import AxiosInstance from "../../api/AxiosInstance";
import axiosInstance from "../../axios/axiosInstance";
import { RequestMethod } from "../../enums/RequestMethod";

interface MakeRequestOptions {
  headers?: Record<string, string>;
  data?: any;
  params?: any;
  returnAllResponse?: boolean;
}

interface IRequestResponse {
  data: any;
  success: boolean;
  error: boolean;
  errorMessage: string | null;
}

export async function makeRequest(
  method: RequestMethod,
  endpoint: string,
  options: MakeRequestOptions = {}
): Promise<IRequestResponse> {
  try {
    const response = await axiosInstance.request({
      method,
      url: endpoint,
      headers: options.headers,
      data: options.data,
      params: options.params,
    });

    return {
      data: options.returnAllResponse ? response : response.data,
      success: true,
      error: false,
      errorMessage: null,
    };
  } catch (error: any) {
    let tmpData: any = error?.response?.data?.data ?? null;
    return {
      data: tmpData,
      success: false,
      error: true,
      errorMessage: error?.response?.data?.error ?? error.message,
    };
  }
}