import { Request, Response } from 'express';
import { prisma } from '../utils/database';
import { CreateTaskInput, UpdateTaskInput, ApiResponse, TaskResponse } from '../types/task.types';

export class TaskController {
  static async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await prisma.task.findMany({
        orderBy: { createdAt: 'desc' },
      });

      const response: ApiResponse<TaskResponse[]> = {
        success: true,
        data: tasks,
        message: 'Tasks retrieved successfully',
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to fetch tasks',
      };
      res.status(500).json(response);
    }
  }

  static async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const task = await prisma.task.findUnique({
        where: { id },
      });

      if (!task) {
        const response: ApiResponse = {
          success: false,
          error: 'Task not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<TaskResponse> = {
        success: true,
        data: task,
        message: 'Task retrieved successfully',
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching task:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to fetch task',
      };
      res.status(500).json(response);
    }
  }

  static async createTask(req: Request, res: Response): Promise<void> {
    try {
      const { title, color = '#3B82F6' }: CreateTaskInput = req.body;

      const task = await prisma.task.create({
        data: {
          title,
          color,
        },
      });

      const response: ApiResponse<TaskResponse> = {
        success: true,
        data: task,
        message: 'Task created successfully',
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Error creating task:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to create task',
      };
      res.status(500).json(response);
    }
  }

  static async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: UpdateTaskInput = req.body;

      const existingTask = await prisma.task.findUnique({
        where: { id },
      });

      if (!existingTask) {
        const response: ApiResponse = {
          success: false,
          error: 'Task not found',
        };
        res.status(404).json(response);
        return;
      }

      const task = await prisma.task.update({
        where: { id },
        data: updateData,
      });

      const response: ApiResponse<TaskResponse> = {
        success: true,
        data: task,
        message: 'Task updated successfully',
      };

      res.json(response);
    } catch (error) {
      console.error('Error updating task:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to update task',
      };
      res.status(500).json(response);
    }
  }

  static async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const existingTask = await prisma.task.findUnique({
        where: { id },
      });

      if (!existingTask) {
        const response: ApiResponse = {
          success: false,
          error: 'Task not found',
        };
        res.status(404).json(response);
        return;
      }

      await prisma.task.delete({
        where: { id },
      });

      const response: ApiResponse = {
        success: true,
        message: 'Task deleted successfully',
      };

      res.json(response);
    } catch (error) {
      console.error('Error deleting task:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to delete task',
      };
      res.status(500).json(response);
    }
  }
}
