import { useState } from 'react';
import { useSessionStore } from '../store/session';
import ApiAdapter from '../features/tasks/services/api';

export default function TaskFormPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const token = useSessionStore((state) => state.session?.token);
  const taskApi = ApiAdapter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!token) {
      alert('No estás autenticado.');
      return;
    }

    try {
      const response = await taskApi.createTask({ title, description, done: false }, token);

      if (response.isOk) {
        alert('Tarea creada exitosamente.');
        setTitle('');
        setDescription('');
      } else {
        alert(`Error al crear la tarea: ${response.message}`);
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Hubo un error de red al crear la tarea.');
    }
  };

  return (
    <div className="h-screen w-full bg-background flex flex-col items-center justify-center px-10">
      <div className="m-8 rounded-xl bg-baseLight flex flex-col h-full w-full p-6">
        <h1 className="text-2xl font-bold mb-4 text-terciary">Crear Nueva Tarea</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-terciary">
              Título
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-terciary"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-terciary">
              Descripción
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-terciary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-terciary bg-primary hover:bg-secondary hover:text-white"
          >
            Crear Tarea
          </button>
        </form>
      </div>
    </div>
  );
}
