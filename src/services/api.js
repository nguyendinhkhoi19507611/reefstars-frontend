
import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
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

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    } else {
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (formData) => api.put('/auth/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  changePassword: (passwordData) => api.put('/auth/change-password', passwordData),
  getMyReefStars: (params) => api.get('/auth/my-reefstars', { params }),
  logout: () => api.post('/auth/logout'),
};

// ReefStars API
export const reefStarsAPI = {
  getAll: (params) => api.get('/reefstars', { params }),
  getById: (id) => api.get(`/reefstars/${id}`),
  getByQR: (qrCode) => api.get(`/reefstars/qr/${qrCode}`),
  getNearby: (params) => api.get('/reefstars/near', { params }),
  getStats: (id) => api.get(`/reefstars/${id}/stats`),
  create: (data) => api.post('/reefstars', data),
  update: (id, data) => api.put(`/reefstars/${id}`, data),
  delete: (id) => api.delete(`/reefstars/${id}`),
};

// Companies API
export const companiesAPI = {
  getAll: (params) => api.get('/companies', { params }),
  getById: (id) => api.get(`/companies/${id}`),
  getByRegion: (region, params) => api.get(`/companies/region/${region}`, { params }),
  getReefStars: (id, params) => api.get(`/companies/${id}/reefstars`, { params }),
  getStats: (id) => api.get(`/companies/${id}/stats`),
  getTop: (params) => api.get('/companies/top', { params }),
  create: (formData) => api.post('/companies', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/companies/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/companies/${id}`),
};

// Coral Updates API
export const coralUpdatesAPI = {
  getByReefStar: (reefStarId, params) => api.get(`/coral-updates/reefstar/${reefStarId}`, { params }),
  getById: (id) => api.get(`/coral-updates/${id}`),
  getRecent: (params) => api.get('/coral-updates/recent', { params }),
  create: (formData) => api.post('/coral-updates', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/coral-updates/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/coral-updates/${id}`),
  toggleLike: (id) => api.post(`/coral-updates/${id}/like`),
  addComment: (id, comment) => api.post(`/coral-updates/${id}/comment`, comment),
  deleteComment: (id, commentId) => api.delete(`/coral-updates/${id}/comment/${commentId}`),
  verify: (id) => api.put(`/coral-updates/${id}/verify`),
};

// Statistics API
export const statsAPI = {
  getOverview: () => api.get('/stats/overview'),
  getSurvivalRate: (params) => api.get('/stats/survival-rate', { params }),
  getCoverage: (params) => api.get('/stats/coverage', { params }),
  getMonthlyGrowth: (params) => api.get('/stats/monthly-growth', { params }),
  getHealthDistribution: (params) => api.get('/stats/health-distribution', { params }),
  getRegions: () => api.get('/stats/regions'),
  getLeaderboard: (params) => api.get('/stats/leaderboard', { params }),
};

// Upload API
export const uploadAPI = {
  image: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  images: (files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    return api.post('/upload/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  avatar: (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/upload/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
};

// Utility functions
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  return `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}/uploads/${imagePath}`;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDateShort = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

export const getHealthColor = (status) => {
  const colors = {
    excellent: 'text-green-600 bg-green-100',
    good: 'text-emerald-600 bg-emerald-100',
    fair: 'text-yellow-600 bg-yellow-100',
    poor: 'text-orange-600 bg-orange-100',
    dead: 'text-red-600 bg-red-100'
  };
  return colors[status] || 'text-gray-600 bg-gray-100';
};

export const getStatusColor = (status) => {
  const colors = {
    active: 'text-green-600 bg-green-100',
    monitoring: 'text-blue-600 bg-blue-100',
    transplanted: 'text-purple-600 bg-purple-100',
    dead: 'text-red-600 bg-red-100'
  };
  return colors[status] || 'text-gray-600 bg-gray-100';
};

export default api;