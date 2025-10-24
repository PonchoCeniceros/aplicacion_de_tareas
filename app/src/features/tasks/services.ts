import { Task, ApiResponse } from './types';

export interface TaskApiService {
  createTask(task: Omit<Task, '_id'>, token: string): Promise<ApiResponse<Task>>;
  getAllTasks(token: string): Promise<ApiResponse<Task[]>>;
  getTaskById(id: string, token: string): Promise<ApiResponse<Task>>;
  updateTask(id: string, updates: Partial<Task>, token: string): Promise<ApiResponse<Task>>;
  deleteTask(id: string, token: string): Promise<ApiResponse<null>>;
}
