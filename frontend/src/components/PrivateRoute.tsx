import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FaSpinner } from "react-icons/fa";

const PrivateRoute: React.FC = () => {
    const auth = useContext(AuthContext);
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <FaSpinner className="animate-spin text-4xl text-blue-500" />
            </div>
        );
    }

    if (!auth?.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;