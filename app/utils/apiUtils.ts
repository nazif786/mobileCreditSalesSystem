import axios from "axios";

type ApiResponse<T = any> = {
    success: boolean;
    data?: T;
    error?: string;
  };
  
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  
  export const submitForm = async <T>(url: string, data: T): Promise<ApiResponse> => {
    try {
      const response = await axios.post(`${baseURL}${url}`, data);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.response?.data?.error || 'Unexpected Error' };
    }
  };
  
  export const fetchData = async (url: string): Promise<ApiResponse> => {
    try {
      const response = await axios.get(`${baseURL}${url}`);
      // console.log(response.data)
      return { success: true, data: response.data };
    } catch (error:any) {
      return { success: false, error: error.response?.data?.error || 'Unexpected Error' };
    }
  };
  
  export const updateData = async <T>(url: string, data: T): Promise<ApiResponse> => {
    try {
      const response = await axios.put(`${baseURL}${url}`, data);
      return { success: true, data: response.data };
    } catch (error:any) {
      return { success: false, error: error.response?.data?.error || 'Unexpected Error' };
    }
  };
  
  export const deleteData = async (url: string): Promise<ApiResponse> => {
    try {
      const response = await axios.delete(`${baseURL}${url}`);
      return { success: true, data: response.data };
    } catch (error:any) {
      return { success: false, error: error.response?.data?.error || 'Unexpected Error' };
    }
  };