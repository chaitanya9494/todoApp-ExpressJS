export interface CreateTaskInput {
  title: string;
  color?: string;
}

export interface UpdateTaskInput {
  title?: string;
  color?: string;
  completed?: boolean;
}

export interface TaskResponse {
  id: string;
  title: string;
  color: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
