import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import { createTask, updateTask, Task } from "../services/taskService";

interface TaskFormProps {
    task: Task | null;
    onClose: () => void;
    onSave: (task: Task) => void;
}

const TaskSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string(),
    status: Yup.string().oneOf(["pending", "in_progress", "completed"]),
});

const TaskForm: React.FC<TaskFormProps> = ({ task, onClose, onSave }) => {
    const initialValues = {
        title: task?.title || "",
        description: task?.description || "",
        status: task?.status || "pending",
    };

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            let savedTask;

            if (task) {

                savedTask = await updateTask(task.id, values);
                toast.success("Task updated successfully");
            } else {

                savedTask = await createTask(values);
                toast.success("Task created successfully");
            }

            onSave(savedTask);
        } catch (error) {
            toast.error(task ? "Failed to update task" : "Failed to create task");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-opacity-500 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        {task ? "Edit Task" : "Create New Task"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <FaTimes />
                    </button>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={TaskSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
                                    Title
                                </label>
                                <Field
                                    id="title"
                                    name="title"
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter task title"
                                />
                                <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
                                    Description
                                </label>
                                <Field
                                    as="textarea"
                                    id="description"
                                    name="description"
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter task description (optional)"
                                />
                                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="status" className="block text-gray-700 font-medium mb-1">
                                    Status
                                </label>
                                <Field
                                    as="select"
                                    id="status"
                                    name="status"
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </Field>
                                <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:bg-blue-300"
                                >
                                    {isSubmitting ? "Saving..." : task ? "Update" : "Create"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default TaskForm;