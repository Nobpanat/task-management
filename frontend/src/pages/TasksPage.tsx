import React, { useState, useEffect } from "react";
import { getAllTasks, deleteTask, Task } from "../services/taskService";
import { toast } from "react-toastify";
import { FaPlus, FaSpinner } from "react-icons/fa";
import TaskForm from "../components/TaskForm";
import TaskFilter from "../components/TaskFilter";
import ConfirmModal from "../components/ConfirmModal";
import TaskItem from "../components/TaskItem";

const TasksPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>("all");

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const data = await getAllTasks();
            setTasks(data);
        } catch (error) {
            toast.error("Failed to fetch tasks");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenCreateModal = () => {
        setSelectedTask(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (task: Task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };


    const handleDeleteTask = (id: string) => {
        setTaskToDelete(id);
        setIsConfirmModalOpen(true);
    };


    const confirmDeleteTask = async () => {
        if (!taskToDelete) return;

        try {
            await deleteTask(taskToDelete);
            setTasks(tasks.filter(task => task.id !== taskToDelete));
            toast.success("Task deleted successfully");
        } catch (error) {
            toast.error("Failed to delete task");
        } finally {
            setTaskToDelete(null);
        }
    };

    const handleTaskSaved = (savedTask: Task) => {
        if (selectedTask) {

            setTasks(tasks.map(task => task.id === savedTask.id ? savedTask : task));
        } else {

            setTasks([savedTask, ...tasks]);
        }
        handleCloseModal();
    };

    const handleFilterChange = (status: string) => {
        setFilterStatus(status);
    };

    const filteredTasks = filterStatus === "all"
        ? tasks
        : tasks.filter(task => task.status === filterStatus);



    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Tasks</h1>
                <button
                    onClick={handleOpenCreateModal}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
                >
                    <FaPlus className="mr-2" /> Add New Task
                </button>
            </div>

            <TaskFilter currentFilter={filterStatus} onFilterChange={handleFilterChange} />

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <FaSpinner className="animate-spin text-4xl text-blue-500" />
                </div>
            ) : filteredTasks.length === 0 ? (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No tasks found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTasks.map((task) => (
                        <TaskItem key={task.id} task={task} onEdit={handleOpenEditModal} onDelete={handleDeleteTask} />
                    ))}
                </div>
            )}

            {isModalOpen && (
                <TaskForm
                    task={selectedTask}
                    onClose={handleCloseModal}
                    onSave={handleTaskSaved}
                />
            )}


            <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={confirmDeleteTask}
                title="Delete Task"
                message="Are you sure you want to delete this task? This action cannot be undone."
            />
        </div>
    );
};

export default TasksPage;