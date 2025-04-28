import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required")
});

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useContext(AuthContext);


    const from = location.state?.from?.pathname || "/";

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        await auth?.login(values.email, values.password);
                        toast.success("Login successful");

                        navigate(from);
                    } catch (error) {
                        toast.error("Email or password is incorrect");
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
                            <Field
                                type="email"
                                name="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
                            <Field
                                type="password"
                                name="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 flex items-center justify-center"
                        >
                            <FaSignInAlt className="mr-2" />
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>
                    </Form>
                )}
            </Formik>

            <div className="mt-6 text-center">
                <p className="text-gray-600">
                    Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;