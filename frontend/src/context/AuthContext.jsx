// src/Context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔹 Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔹 Login function
  const login = async (email, password) => {
    const res = await fetch("http://localhost:4000/api/auth/login", {
      email: email, 
      password: password,
    });

    const data = await res.json();
    console.log("Login response:", data); // 👈 Check what backend sends

    if (!res.ok) throw new Error(data.msg || "Login failed");

    setUser(data.user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data.user;
  };

  // 🔹 Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};