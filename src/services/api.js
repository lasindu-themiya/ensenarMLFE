import axios from 'axios';
import { toApiSubject } from '../utils/subjectMapping';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get available subjects
export const getAvailableSubjects = async () => {
  try {
    const response = await api.get('/api/predict/subjects');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch subjects');
  }
};

// Make prediction
export const makePrediction = async (subject, data) => {
  try {
    const apiSubject = toApiSubject(subject);
    const response = await api.post(`/api/predict/${apiSubject}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Prediction failed');
  }
};

// Health check
export const checkHealth = async () => {
  try {
    const response = await api.get('/api/health');
    return response.data;
  } catch (error) {
    throw new Error('API is not available');
  }
};

export default api;
