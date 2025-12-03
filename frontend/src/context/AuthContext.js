import { createContext, useState, useEffect } from "react";
import api from "../api/axios"; // use the axios instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user profile using token
  const fetchProfile = async (token) => {
    try {
      const res = await api.get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const profile = res.data.user;
      setUser({ ...profile, token });
      localStorage.setItem("name", profile.name);
      return profile;
    } catch (err) {
      console.error("Failed to fetch profile:", err.response?.data || err.message);
      logout();
      return null;
    }
  };

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile(token);
    }
  }, []);

  const login = async ({ token }) => {
    localStorage.setItem("token", token);
    const profile = await fetchProfile(token);
    return !!profile;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
