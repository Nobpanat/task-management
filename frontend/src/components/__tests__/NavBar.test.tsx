import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavBar from '../NavBar';
import { AuthContext } from '../../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';


vi.mock('react-toastify', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    }
}));


const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('NavBar Component', () => {
    const mockLogout = vi.fn();

    const renderWithAuth = (isAuthenticated = false, user: { email: string; id: string } | null = null) => {
        return render(
            <AuthContext.Provider value={{
                isAuthenticated,
                user,
                login: vi.fn(),
                logout: mockLogout,
                loading: false
            }}>
                <BrowserRouter>
                    <NavBar />
                </BrowserRouter>
            </AuthContext.Provider>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the logo and title', () => {
        // Arrange
        renderWithAuth();

        // Act & Assert
        expect(screen.getByText('Task Manager')).toBeInTheDocument();
    });

    it('renders login and register links when not authenticated', () => {
        // Arrange
        renderWithAuth();

        // Act & Assert
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Register')).toBeInTheDocument();
        expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    });

    it('renders user email and logout button when authenticated', () => {
        // Arrange
        const mockUser = { email: 'test@example.com', id: '123' };
        renderWithAuth(true, mockUser);

        // Act & Assert
        expect(screen.getByText('My Tasks')).toBeInTheDocument();
        expect(screen.getByText('test@example.com')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
    });

    it('calls logout function and navigates when logout button is clicked', async () => {
        // Arrange
        const user = userEvent.setup();
        const mockUser = { email: 'test@example.com', id: '123' };
        renderWithAuth(true, mockUser);

        // Act
        await user.click(screen.getByText('Logout'));

        // Assert
        expect(mockLogout).toHaveBeenCalledTimes(1);
        expect(toast.success).toHaveBeenCalledWith('Logged out successfully');
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});