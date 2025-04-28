
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserPlus } from "react-icons/fa";
import { register } from "../services/authService";

const RegisterSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required")
});

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

            <Formik
                initialValues={{ email: "", password: "", confirmPassword: "" }}
                validationSchema={RegisterSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        await register(values.email, values.password);
                        toast.success("Registration successful. Please login.");
                        navigate("/login");
                    } catch (error: any) {
                        const message = error.response?.data?.message || "Registration failed";
                        toast.error(message);
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

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
                            <Field
                                type="password"
                                name="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">Confirm Password</label>
                            <Field
                                type="password"
                                name="confirmPassword"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Confirm your password"
                            />
                            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 flex items-center justify-center"
                        >
                            <FaUserPlus className="mr-2" />
                            {isSubmitting ? "Registering..." : "Register"}
                        </button>
                    </Form>
                )}
            </Formik>

            <div className="mt-6 text-center">
                <p className="text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;