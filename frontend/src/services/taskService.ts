import api from "../api/axios";
import { API_ENDPOINTS } from "../api/enpoint";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "completed";
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  status?: "pending" | "in_progress" | "completed";
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: "pending" | "in_progress" | "completed";
}

export const getAllTasks = async (): Promise<Task[]> => {
  const response = await api.get(API_ENDPOINTS.TASKS.BASE);
  return response.data;
};

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await api.get(API_ENDPOINTS.TASKS.BY_ID(id));
  return response.data;
};

export const createTask = async (task: CreateTaskDto): Promise<Task> => {
  const response = await api.post(API_ENDPOINTS.TASKS.BASE, task);
  return response.data;
};

export const updateTask = async (
  id: string,
  task: UpdateTaskDto
): Promise<Task> => {
  const response = await api.patch(API_ENDPOINTS.TASKS.BY_ID(id), task);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(API_ENDPOINTS.TASKS.BY_ID(id));
};
