import express from 'express';
import { TaskController } from '../controllers/taskController';
import {
  validateCreateTask,
  validateUpdateTask,
  handleValidationErrors,
} from '../middleware/validation';

const router = express.Router();

router.get('/', TaskController.getAllTasks);

router.get('/:id', TaskController.getTaskById);

router.post(
  '/',
  validateCreateTask,
  handleValidationErrors,
  TaskController.createTask
);

router.put(
  '/:id',
  validateUpdateTask,
  handleValidationErrors,
  TaskController.updateTask
);

router.delete('/:id', TaskController.deleteTask);

export default router;
