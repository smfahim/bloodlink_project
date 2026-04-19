import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // Page reload 
  useEffect(() => {
    const stored = localStorage.getItem("bloodlinkUser");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  // Register
  const register = async (formData) => {
    const { data } = await API.post("/auth/register", formData);
    localStorage.setItem("bloodlinkUser", JSON.stringify(data));
    setUser(data);
    return data;
  };

  // Login
  const login = async (formData) => {
    const { data } = await API.post("/auth/login", formData);
    localStorage.setItem("bloodlinkUser", JSON.stringify(data));
    setUser(data);
    return data;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("bloodlinkUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);