import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login page
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Expense service
export const expenseService = {
  getAll: () => api.get('/expenses'),
  getById: (id: string) => api.get(`/expenses/${id}`),
  create: (expense: any) => api.post('/expenses', expense),
  update: (id: string, expense: any) => api.put(`/expenses/${id}`, expense),
  delete: (id: string) => api.delete(`/expenses/${id}`),
  getByDate: (date: string) => api.get(`/expenses/byDate?date=${date}`),
  getByDateRange: (startDate: string, endDate: string) => 
    api.get(`/expenses/byDateBetween?startDate=${startDate}&endDate=${endDate}`),
  getByCategory: (category: string, date: string) => 
    api.get(`/expenses/byCategory?Category=${category}&date=${date}`),
  getByCategoryAndDateRange: (category: string, startDate: string, endDate: string) => 
    api.get(`/expenses/byCategoryAndDateRange?Category=${category}&startdate=${startDate}&endDate=${endDate}`),
};

// Auth service
export const authService = {
  login: (credentials: { username: string; password: string }) => 
    api.post('/auth/login', credentials),
  register: (userData: { username: string; email: string; password: string }) => 
    api.post('/auth/register', userData),
};