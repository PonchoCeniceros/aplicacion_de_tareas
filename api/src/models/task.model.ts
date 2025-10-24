import Task from '../domain/task';
import { Schema, model, Document } from 'mongoose';

/**
 *
 */
interface TaskModel extends Task, Document { }

/**
 *
 */
const taskSchema = new Schema<TaskModel>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  done: { type: Boolean, required: true },
});

/**
 *
 */
const taskModel = model<TaskModel>('Task', taskSchema);

export { taskModel, TaskModel };
