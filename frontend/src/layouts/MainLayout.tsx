import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";
import { AuthProvider } from "../contexts/AuthContext";
const MainLayout: React.FC = () => {
    return (
        <>
            <AuthProvider>

                <NavBar />
                <main>
                    <div className="px-4 md:px-6 pt-12 pb-24 w-full xl:w-[45%] space-y-6">
                        <Outlet />
                    </div>
                </main>
                <Footer />
                <ToastContainer transition={Slide} autoClose={1500} position="top-right" />
            </AuthProvider>
        </>
    );
};

export default MainLayout;