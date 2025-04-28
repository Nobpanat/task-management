import { createContext, useState, useEffect, ReactNode } from "react";
import { login as apiLogin, logout as apiLogout, isLoggedIn as checkIsLoggedIn, getCurrentUser } from "../services/authService";

interface AuthContextType {
    isAuthenticated: boolean;
    user: any;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const checkAuth = async () => {
            try {
                setIsAuthenticated(checkIsLoggedIn());
                setUser(getCurrentUser());
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        const data = await apiLogin(email, password);
        setIsAuthenticated(true);
        setUser(data.user);
        return data;
    };

    const logout = () => {
        apiLogout();
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};