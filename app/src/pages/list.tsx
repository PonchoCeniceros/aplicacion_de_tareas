import { useEffect, useState } from 'react';
import TaskCard from '../components/tasks/TaskCard';
import { useSessionStore } from '../store/session';
import { Task } from '../features/tasks/types';
import ApiAdapter from '../features/tasks/services/api';

export default function ListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = useSessionStore((state) => state.session?.token);
  const taskApi = ApiAdapter();

  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) {
        setError('No estás autenticado.');
        setLoading(false);
        return;
      }

      try {
        const response = await taskApi.getAllTasks(token);
        if (response.isOk) {
          setTasks(response.data || []);
        } else {
          setError(response.message || 'Error al obtener las tareas.');
        }
      } catch (err) {
        setError('Hubo un error de red al obtener las tareas.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      const response = await taskApi.deleteTask(id, token);
      if (response.isOk) {
        setTasks(tasks.filter((task) => task._id !== id));
      } else {
        alert('Error al eliminar la tarea.');
      }
    } catch (error) {
      alert('Hubo un error de red.');
    }
  };

  const handleUpdate = async (id: string, updates: Partial<Task>) => {
    if (!token) return;
    try {
      const response = await taskApi.updateTask(id, updates, token);
      if (response.isOk) {
        setTasks(tasks.map((task) => (task._id === id ? response.data! : task)));
      } else {
        alert('Error al actualizar la tarea.');
      }
    } catch (error) {
      alert('Hubo un error de red.');
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-offline">Error: {error}</div>;
  }

  return (
    <div className="h-screen w-full bg-background flex flex-col items-center justify-center px-10">
      <div className="m-8 rounded-xl bg-baseLight flex flex-col h-full w-full p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4 text-terciary">Lista de Tareas</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onDelete={handleDelete} onUpdate={handleUpdate} />
          ))}
        </div>
      </div>
    </div>
  );
}
