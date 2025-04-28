import React from "react";
import { FaTasks, FaClock, FaRunning, FaCheck } from "react-icons/fa";

interface TaskFilterProps {
    currentFilter: string;
    onFilterChange: (status: string) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ currentFilter, onFilterChange }) => {
    return (
        <div className="flex flex-wrap gap-2 mb-6">
            <button
                onClick={() => onFilterChange("all")}
                className={`flex items-center px-4 py-2 rounded-full ${currentFilter === "all"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
            >
                <FaTasks className="mr-2" /> All
            </button>
            <button
                onClick={() => onFilterChange("pending")}
                className={`flex items-center px-4 py-2 rounded-full ${currentFilter === "pending"
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
            >
                <FaClock className="mr-2" /> Pending
            </button>
            <button
                onClick={() => onFilterChange("in_progress")}
                className={`flex items-center px-4 py-2 rounded-full ${currentFilter === "in_progress"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
            >
                <FaRunning className="mr-2" /> In Progress
            </button>
            <button
                onClick={() => onFilterChange("completed")}
                className={`flex items-center px-4 py-2 rounded-full ${currentFilter === "completed"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
            >
                <FaCheck className="mr-2" /> Completed
            </button>
        </div>
    );
};

export default TaskFilter;