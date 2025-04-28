import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
            <FaExclamationTriangle className="text-yellow-500 text-6xl mb-4" />
            <h1 className="text-4xl font-bold mb-2">404</h1>
            <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-6">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
                <FaHome className="mr-2" /> Go to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;