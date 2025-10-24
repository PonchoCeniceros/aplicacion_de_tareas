import express from 'express';
import { createTaskEndpoint, deleteTaskEndpoint, getAllTasksEndpoint, getTaskByIdEndpoint, updateTaskEndpoint } from './controllers';
import { authMiddleware } from '../auth/middlewares';
import { Role } from '../domain/role';

const router = express.Router();

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una nueva tarea.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               done:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente.
 *       500:
 *         description: Error al crear la tarea.
 */
router.post('/', authMiddleware([Role.USER, Role.ADMIN]), createTaskEndpoint);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retornar todas las tareas.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tareas obtenidas exitosamente.
 *       500:
 *         description: Error al obtener las tareas.
 */
router.get('/', authMiddleware([Role.USER, Role.ADMIN]), getAllTasksEndpoint);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retornar una tarea específica.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea obtenida exitosamente.
 *       404:
 *         description: Tarea no encontrada.
 *       500:
 *         description: Error al obtener la tarea.
 */
router.get('/:id', authMiddleware([Role.USER, Role.ADMIN]), getTaskByIdEndpoint);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea existente.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               done:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente.
 *       404:
 *         description: Tarea no encontrada.
 *       500:
 *         description: Error al actualizar la tarea.
 */
router.put('/:id', authMiddleware([Role.USER, Role.ADMIN]), updateTaskEndpoint);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente.
 *       404:
 *         description: Tarea no encontrada.
 *       500:
 *         description: Error al eliminar la tarea.
 */
router.delete('/:id', authMiddleware([Role.USER, Role.ADMIN]), deleteTaskEndpoint);

export default router;
