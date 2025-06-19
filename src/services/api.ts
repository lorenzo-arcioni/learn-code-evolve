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
    try {
      // Use FormData for login as required by OAuth2 password flow
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      
      const response = await api.post('/token', formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      if (response.data.access_token) {
        localStorage.setItem('ml_academy_token', response.data.access_token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  register: async (userData: { username: string; email: string; password: string; full_name?: string }) => {
    try {
      const response = await api.post('/users/', userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
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
  
  updateProfile: async (profileData: { full_name?: string; email?: string }) => {
    const response = await api.put('/users/me', profileData);
    return response.data;
  },
  
  uploadAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/users/me/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
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
  
  getTheoryStructure: async () => {
    const response = await api.get('/theory/structure');
    return response.data;
  },
  
  getTheoryContent: async (path: string) => {
    const response = await api.get(`/theory/content/${path}`);
    return response.data;
  },
  
  // Aggiunto nuovo metodo per registrare le visualizzazioni
  recordContentView: async (contentId: string, contentType: string, contentTitle: string) => {
    const response = await api.post('/content/view', { content_id: contentId, content_type: contentType, content_title: contentTitle });
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

// API functions for shop
export const shopApi = {
  getProducts: async () => {
    const response = await api.get('/products/');
    return response.data;
  },
  
  getProductById: async (productId: string) => {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  },
  
  submitConsultationRequest: async (requestData: {
    firstName: string;
    lastName: string;
    email: string;
    consultationType: string;
    description: string;
  }) => {
    const response = await api.post('/consultation-request', requestData);
    return response.data;
  },
};

// API functions for courses
export const coursesApi = {
  getCourses: async () => {
    const response = await api.get('/courses/');
    return response.data;
  },
  
  getCourseById: async (courseId: string) => {
    const response = await api.get(`/courses/${courseId}`);
    return response.data;
  },
  
    // Nuova funzione per ottenere il contenuto completo del corso
  getCourseContent: async (courseId: string) => {
    const response = await api.get(`/courses/${courseId}`);
    return response.data;
  },
  
  // Nuova funzione per ottenere l'anteprima del corso
  getCoursePreview: async (courseId: string) => {
    const response = await api.get(`/courses/${courseId}/preview`);
    return response.data;
  },
};

// API functions for contact/feedback
export const contactApi = {
  submitFeedback: async (feedbackData: {
    name: string;
    email: string;
    message: string;
  }) => {
    const response = await api.post('/contact/feedback', feedbackData);
    return response.data;
  },
};

export default api;
