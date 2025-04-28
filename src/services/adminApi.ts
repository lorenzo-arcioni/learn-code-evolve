
import axios from "axios";

const BASE_URL = "http://localhost:8000";

// Funzione di utilità per ottenere il token
const getToken = () => localStorage.getItem("ml_academy_token");

const adminApi = {
  // User management
  getUsers: async (filters?: { email?: string, role?: string, is_active?: boolean }) => {
    try {
      const token = getToken();
      const response = await axios.get(`${BASE_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
        params: filters
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  updateUserRole: async (userId: string, isAdmin: boolean) => {
    const token = getToken();
    const response = await axios.put(
      `${BASE_URL}/admin/users/${userId}/role?promote=${isAdmin}`,
      {},  // Corpo vuoto
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },
  
  updateUserStatus: async (userId: string, isActive: boolean) => {
    const token = getToken();
    const response = await axios.put(
      `${BASE_URL}/admin/users/${userId}/status?active=${isActive}`,
      {},  // Corpo vuoto
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  // Dashboard statistics
  getStatistics: async (timeRange: string) => {
    try {
      const token = getToken();
      const response = await axios.get(
        `${BASE_URL}/admin/statistics/dashboard?time_range=${timeRange}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching statistics:", error);
      throw error;
    }
  },

  // Feedback management
  getFeedback: async (filters?: { resolved?: boolean }) => {
    try {
      const token = getToken();
      const response = await axios.get(`${BASE_URL}/admin/feedback`, {
        headers: { Authorization: `Bearer ${token}` },
        params: filters
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching feedback:", error);
      throw error;
    }
  },

  markFeedbackAsResolved: async (feedbackId: string) => {
    try {
      const token = getToken();
      const response = await axios.put(`${BASE_URL}/admin/feedback/${feedbackId}/resolve`, 
        { resolved: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error("Error marking feedback as resolved:", error);
      throw error;
    }
  },
  
  // Content management
  addExercise: async (exerciseData: any) => {
    try {
      const token = getToken();
      const response = await axios.post(`${BASE_URL}/admin/add-exercise`, 
        exerciseData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding exercise:", error);
      throw error;
    }
  },
  
  addCourse: async (courseData: any) => {
    try {
      const token = getToken();
      const response = await axios.post(`${BASE_URL}/admin/add-course`, 
        courseData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding course:", error);
      throw error;
    }
  },
  
  addProduct: async (productData: any) => {
    try {
      const token = getToken();
      const response = await axios.post(`${BASE_URL}/admin/add-product`, 
        productData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  },

  getCategories: async (type: string) => {
    try {
      const token = getToken();
      const response = await axios.get(`${BASE_URL}/admin/categories/${type}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  // Ottieni tutte le richieste di consulenza
  getConsultationRequests: async () => {
    const response = await fetch(`${BASE_URL}/admin/consultations`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ml_academy_token")}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch consultation requests");
    }

    return response.json();
  },

  // Aggiorna lo stato di una richiesta di consulenza
  updateConsultationStatus: async ({ id, status }) => {
    const response = await fetch(`${BASE_URL}/admin/consultations/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ml_academy_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update consultation request status");
    }
    return response.json();
  },

};

export default adminApi;
