import { Task } from '../../features/tasks/types';
import { useSessionStore } from '../../store/session';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
}

export default function TaskCard({ task, onDelete, onUpdate }: TaskCardProps) {
  const token = useSessionStore((state) => state.session?.token);

  const handleToggleDone = async () => {
    if (!token) {
      alert('No estás autenticado.');
      return;
    }
    onUpdate(task._id, { done: !task.done });
  };

  const handleDelete = () => {
    if (!token) {
      alert('No estás autenticado.');
      return;
    }
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      onDelete(task._id);
    }
  };

  return (
    <div className={`p-4 rounded-lg border-2 border-black ${task.done ? 'bg-base' : 'bg-baseLight'} flex flex-col justify-between`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-terciary">{task.title}</h3>
          <p className="text-secondary">{task.description}</p>
        </div>
        <input
          type="checkbox"
          checked={task.done}
          onChange={handleToggleDone}
          className="form-checkbox h-5 w-5 text-primary rounded focus:ring-secondary border-gray-300 bg-white"
        />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={handleDelete}
          className="px-3 py-1 text-sm font-medium text-white bg-red-900 hover:bg-red-700 rounded-md"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
