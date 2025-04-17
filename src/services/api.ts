
import axios from 'axios';

// Create an axios instance for the FastAPI backend
const api = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ml_academy_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API functions for authentication
export const authApi = {
  login: async (username: string, password: string) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await api.post('/token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    if (response.data.access_token) {
      localStorage.setItem('ml_academy_token', response.data.access_token);
    }
    
    return response.data;
  },
  
  register: async (userData: { username: string; email: string; password: string; full_name?: string }) => {
    const response = await api.post('/users/', userData);
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('ml_academy_token');
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
  
  getUserProgress: async () => {
    const response = await api.get('/users/me/progress');
    return response.data;
  },
};

// API functions for exercises
export const exerciseApi = {
  getAllExercises: async () => {
    const response = await api.get('/exercises/');
    return response.data;
  },
  
  getExercise: async (exerciseId: string) => {
    const response = await api.get(`/exercises/${exerciseId}`);
    return response.data;
  },
  
  submitSolution: async (exerciseId: string, solution: any) => {
    const response = await api.post(`/exercises/${exerciseId}/submit`, { solution });
    return response.data;
  },
};

// API functions for theory content
export const theoryApi = {
  getAllTheories: async () => {
    const response = await api.get('/theory/');
    return response.data;
  },
  
  getTheory: async (theoryId: string) => {
    const response = await api.get(`/theory/${theoryId}`);
    return response.data;
  },
  
  getTheoriesByCategory: async (category: string) => {
    const response = await api.get(`/theory/category/${category}`);
    return response.data;
  },
};

// API functions for leaderboard
export const leaderboardApi = {
  getLeaderboard: async () => {
    const response = await api.get('/leaderboard/');
    return response.data;
  },
};

export default api;
