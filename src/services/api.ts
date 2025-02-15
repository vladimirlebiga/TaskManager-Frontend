import { TaskRequest, TaskStatus, TaskUpdate } from '@/types/task';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTasks = async (status:TaskStatus) => {
  const response = await apiClient.get(`/tasks?status=${status}`);
  return response.data;
};

export const getById = async (id: number) => {
  const response = await apiClient.get(`/tasks/${id}`);
  return response.data;
}

export const createTask = async (task: TaskRequest) => {
  const response = await apiClient.post('/tasks', task);
  return response.data;
};

export const updateTask = async (id: number, task: TaskUpdate) => {
  const response = await apiClient.put(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: number) => {
  console.log(id);
  const response = await apiClient.delete(`/tasks/${id}`);
  console.log(response);
  return response.data;
};


