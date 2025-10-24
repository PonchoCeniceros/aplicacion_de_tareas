// dominio
import ApiResponse from '../domain/apiResponse';
import Task from '../domain/task';
// aplicación
import { taskModel } from '../models/task.model';
// infraestructura
import { Request, Response } from 'express';

/**
 *
 */
export async function createTaskEndpoint(req: Request, res: Response) {
  try {
    const { title, description, done } = req.body;
    const newTask = new taskModel({ title, description, done });
    await newTask.save();
    res.status(201).json({
      isOk: true,
      message: 'Tarea creada exitosamente.',
      data: newTask
    } as ApiResponse<Task>);
  } catch (error) {
    res.status(500).json({
      isOk: false,
      message: 'Error al crear la tarea.',
      data: error
    } as ApiResponse<any>);
  }
}

/**
 *
 */
export async function getAllTasksEndpoint(req: Request, res: Response) {
  try {
    const tasks = await taskModel.find();
    res.status(200).json({
      isOk: true,
      message: 'Tareas obtenidas exitosamente.',
      data: tasks
    } as ApiResponse<Task[]>);
  } catch (error) {
    res.status(500).json({
      isOk: false,
      message: 'Error al obtener las tareas.',
      data: error
    } as ApiResponse<any>);
  }
}

/**
 *
 */
export async function getTaskByIdEndpoint(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const task = await taskModel.findById(id);
    if (!task) {
      return res.status(404).json({
        isOk: false,
        message: 'Tarea no encontrada.',
        data: null
      } as ApiResponse<null>);
    }
    res.status(200).json({
      isOk: true,
      message: 'Tarea obtenida exitosamente.',
      data: task
    } as ApiResponse<Task>);
  } catch (error) {
    res.status(500).json({
      isOk: false,
      message: 'Error al obtener la tarea.',
      data: error
    } as ApiResponse<any>);
  }
}

/**
 *
 */
export async function updateTaskEndpoint(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title, description, done } = req.body;
    const updatedTask = await taskModel.findByIdAndUpdate(id, { title, description, done }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({
        isOk: false,
        message: 'Tarea no encontrada.',
        data: null
      } as ApiResponse<null>);
    }
    res.status(200).json({
      isOk: true,
      message: 'Tarea actualizada exitosamente.',
      data: updatedTask
    } as ApiResponse<Task>);
  } catch (error) {
    res.status(500).json({
      isOk: false,
      message: 'Error al actualizar la tarea.',
      data: error
    } as ApiResponse<any>);
  }
}

/**
 *
 */
export async function deleteTaskEndpoint(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deletedTask = await taskModel.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({
        isOk: false,
        message: 'Tarea no encontrada.',
        data: null
      } as ApiResponse<null>);
    }
    res.status(200).json({
      isOk: true,
      message: 'Tarea eliminada exitosamente.',
      data: null
    } as ApiResponse<null>);
  } catch (error) {
    res.status(500).json({
      isOk: false,
      message: 'Error al eliminar la tarea.',
      data: error
    } as ApiResponse<any>);
  }
}
