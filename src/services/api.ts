import axios from 'axios';

// INTERFACE DEFINITIONS
interface LoginCredentials {
  email: string;
  password: string;
}
interface RegisterData {
  name: string;
  email: string;
  password: string;
}
interface ContentData {
  title: string;
  body: string;
}
interface ContentsParams {
  search?: string;
  page?: number;
  limit?: number;
}

// AXIOS INSTANCE & INTERCEPTOR
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// API FUNCTIONS

// === AUTHENTICATION ===
export const loginUser = (credentials: LoginCredentials) => {
  return apiClient.post('/auth/login', credentials);
};
export const registerUser = (userData: RegisterData) => {
    return apiClient.post('/auth/register', userData);
};

// === CONTENTS ===
export const getAllContents = (params: ContentsParams = {}) => {
  return apiClient.get('/contents', { params }); 
};
export const createContent = (contentData: ContentData) => {
    return apiClient.post('/contents', contentData);
};
export const deleteContent = (id: number) => {
    return apiClient.delete(`/contents/${id}`);
};

export const getContentById = (id: number) => {
    return apiClient.get(`/contents/${id}`);
};
export const updateContent = (id: number, contentData: ContentData) => {
    return apiClient.put(`/contents/${id}`, contentData);
};

export default apiClient;