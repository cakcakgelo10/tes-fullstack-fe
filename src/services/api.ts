import axios from 'axios';

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

// instance axios dengan konfigurasi dasar
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // URL dasar backend 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk Menambahkan Token ke Setiap Request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// === AUTHENTICATION ===
export const loginUser = (credentials: LoginCredentials) => {
  return apiClient.post('/auth/login', credentials);
};

export const registerUser = (userData: RegisterData) => {
    return apiClient.post('/auth/register', userData);
};


// === CONTENTS ===
export const getAllContents = () => {
  return apiClient.get('/contents');
};

export const createContent = (contentData: ContentData) => {
    return apiClient.post('/contents', contentData);
}

export default apiClient;