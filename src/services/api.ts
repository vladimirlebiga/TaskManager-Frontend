import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTasks = async () => {
  const response = await apiClient.get('/tasks');
  return response.data;
};

export const createTask = async (task: { title: string; description: string }) => {
  const response = await apiClient.post('/tasks', task);
  return response.data;
};