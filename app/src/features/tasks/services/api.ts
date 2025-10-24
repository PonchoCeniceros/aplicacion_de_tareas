import { Task, ApiResponse } from '../types';
import { TaskApiService } from '../services';

export default function ApiAdapter(): TaskApiService {
  const API_URL = `${import.meta.env.VITE_API_URL}/tasks`;

  return {
    async createTask(task: Omit<Task, '_id'>, token: string): Promise<ApiResponse<Task>> {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });
      return response.json();
    },

    async getAllTasks(token: string): Promise<ApiResponse<Task[]>> {
      const response = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.json();
    },

    async getTaskById(id: string, token: string): Promise<ApiResponse<Task>> {
      const response = await fetch(`${API_URL}/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.json();
    },

    async updateTask(id: string, updates: Partial<Task>, token: string): Promise<ApiResponse<Task>> {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      return response.json();
    },

    async deleteTask(id: string, token: string): Promise<ApiResponse<null>> {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.json();
    },
  };
}
