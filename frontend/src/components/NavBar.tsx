import reactLogo from "../assets/react.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { FaSignOutAlt, FaSignInAlt, FaUser, FaTasks } from "react-icons/fa";

const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const handleLogout = () => {
        auth?.logout();
        toast.success("Logged out successfully");
        navigate("/login");
    };

    const activeLink = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? "bg-blue-700 bg-opacity-60 rounded px-3 py-2"
            : "hover:bg-blue-700 hover:bg-opacity-20 rounded px-3 py-2";

    return (
        <header>
            <div className="md:text-2xl text-xs  flex items-center mr-auto gap-x-2 font-semibold ">
                <Link to="/">
                    <img src={reactLogo} alt="React Logo" />
                </Link>
                Task Manager
            </div>

            <ul className="flex gap-x-4">
                {auth?.isAuthenticated ? (
                    <>
                        <li className="flex items-center gap-x-2">
                            <NavLink to="/" className={activeLink}>
                                <div className="flex items-center text-xs md:text-base ">
                                    <FaTasks className="mr-2" /> My Tasks
                                </div>
                            </NavLink>
                        </li>
                        <li className="flex items-center gap-x-2 text-xs md:text-base">
                            <div className=" py-2">{auth.user?.email}</div>
                        </li>
                        <li className="flex items-center gap-x-2">
                            <button
                                onClick={handleLogout}
                                className="hover:bg-red-600 bg-red-500 rounded px-3 py-2 text-white flex items-center"
                            >
                                <FaSignOutAlt className="mr-2" /> Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="flex items-center gap-x-2">
                            <NavLink to="/login" className={activeLink}>
                                <div className="flex items-center">
                                    <FaSignInAlt className="mr-2" /> Login
                                </div>
                            </NavLink>
                        </li>
                        <li className="flex items-center gap-x-2">
                            <NavLink to="/register" className={activeLink}>
                                <div className="flex items-center">
                                    <FaUser className="mr-2" /> Register
                                </div>
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
};

export default NavBar;