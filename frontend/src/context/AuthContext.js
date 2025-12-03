import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user profile from backend using token
  const fetchProfile = async (token) => {
    try {
      const res = await axios.get("/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({ ...res.data.user, token });
      localStorage.setItem("name", res.data.user.name); // optional, keep name for refresh
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      logout();
    }
  };

  // Check for token in localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile(token);
    }
  }, []);

  const login = async (userData) => {
    localStorage.setItem("token", userData.token);
    await fetchProfile(userData.token); // fetch full profile after login
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
