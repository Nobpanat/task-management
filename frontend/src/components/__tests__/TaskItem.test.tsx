import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskItem from '../TaskItem';
import { Task } from '../../services/taskService';

describe('TaskItem Component', () => {
    const mockTask: Task = {
        id: '123',
        title: 'Test Task',
        description: 'This is a test task',
        status: 'pending',
        userId: 'user123',
        createdAt: '2025-04-28 02:26:54.005 +0700',
        updatedAt: '2025-04-28 02:26:54.005 +0700'
    };

    const mockOnEdit = vi.fn();
    const mockOnDelete = vi.fn();

    it('renders task details correctly', () => {
        // Arrange
        render(
            <TaskItem
                task={mockTask}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
            />
        );

        // Assert
        expect(screen.getByText('Test Task')).toBeInTheDocument();
        expect(screen.getByText('This is a test task')).toBeInTheDocument();
        expect(screen.getByText('pending')).toBeInTheDocument();
        expect(screen.getByText('4/28/2025')).toBeInTheDocument();
    });

    it('shows "No description" when description is empty', () => {
        // Arrange
        const taskWithoutDesc = { ...mockTask, description: '' };
        render(
            <TaskItem
                task={taskWithoutDesc}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
            />
        );

        // Assert
        expect(screen.getByText('No description')).toBeInTheDocument();
    });

    it('applies correct class for pending status', () => {
        // Arrange
        render(
            <TaskItem
                task={mockTask}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
            />
        );

        // Assert
        const statusElement = screen.getByText('pending');
        expect(statusElement).toHaveClass('bg-yellow-200');
        expect(statusElement).toHaveClass('text-yellow-800');
    });

    it('applies correct class for in_progress status', () => {
        // Arrange
        const inProgressTask = { ...mockTask, status: 'in_progress' };
        render(
            <TaskItem
                task={inProgressTask}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
            />
        );

        // Assert
        const statusElement = screen.getByText('in progress');
        expect(statusElement).toHaveClass('bg-blue-200');
        expect(statusElement).toHaveClass('text-blue-800');
    });

    it('applies correct class for completed status', () => {
        // Arrange
        const completedTask = { ...mockTask, status: 'completed' };
        render(
            <TaskItem
                task={completedTask}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
            />
        );

        // Assert
        const statusElement = screen.getByText('completed');
        expect(statusElement).toHaveClass('bg-green-200');
        expect(statusElement).toHaveClass('text-green-800');
    });

    it('calls onEdit when edit button is clicked', async () => {
        // Arrange
        const user = userEvent.setup();
        render(
            <TaskItem
                task={mockTask}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
            />
        );

        // Act
        await user.click(screen.getByTitle('Edit'));

        // Assert
        expect(mockOnEdit).toHaveBeenCalledTimes(1);
        expect(mockOnEdit).toHaveBeenCalledWith(mockTask);
    });

    it('calls onDelete when delete button is clicked', async () => {
        // Arrange
        const user = userEvent.setup();
        render(
            <TaskItem
                task={mockTask}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
            />
        );

        // Act
        await user.click(screen.getByTitle('Delete'));

        // Assert
        expect(mockOnDelete).toHaveBeenCalledTimes(1);
        expect(mockOnDelete).toHaveBeenCalledWith('123');
    });
});