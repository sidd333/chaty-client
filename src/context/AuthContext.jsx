import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Create a Context for Authentication
const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token") ? true : false);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    // Handle login logic
    const login = async (email, password) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const result = await response.json();

            if (result.success) {
                localStorage.setItem("token", result.token);
                localStorage.setItem("userInfo", JSON.stringify(result));
                setIsAuthenticated(true);
                setUserInfo(result);
                toast.success("Login successful!");
                navigate("/"); // Redirect to the home page
            } else {
                toast.error("Invalid credentials. Please try again.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };

    // Handle logout logic
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        setIsAuthenticated(false);
        setUserInfo(null);
        navigate("/login"); // Redirect to login page after logout
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userInfo, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
