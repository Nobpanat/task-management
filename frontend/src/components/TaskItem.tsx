import { Task } from "../services/taskService";
import { FaEdit, FaTrash } from 'react-icons/fa';

interface TaskItemProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
    const getStatusClassName = (status: string): string => {
        switch (status) {
            case "pending":
                return "bg-yellow-200 text-yellow-800";
            case "in_progress":
                return "bg-blue-200 text-blue-800";
            case "completed":
                return "bg-green-200 text-green-800";
            default:
                return "bg-gray-200 text-gray-800";
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">{task.title}</h3>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onEdit(task)}
                        className="text-blue-500 hover:text-blue-700 hover:bg-gray-100 p-1 hover:rounded-sm"
                        title="Edit"
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-gray-100 p-1 hover:rounded-sm"
                        title="Delete"
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>

            <div className="mt-2">
                <p className="text-gray-600 text-sm mb-3">{task.description || "No description"}</p>
            </div>

            <div className="flex justify-between items-center mt-4">
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusClassName(task.status)}`}>
                    {task.status.replace('_', ' ')}
                </span>
                <span className="text-xs text-gray-500">
                    {new Date(task.createdAt).toLocaleDateString('en-US', {
                        month: 'numeric',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </span>
            </div>
        </div>
    );
};

export default TaskItem;