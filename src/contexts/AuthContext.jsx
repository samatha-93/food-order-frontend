// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import * as jwt_decode from "jwt-decode";// ✅ correct import

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed?.token) {
          const decoded = jwtDecode(parsed.token); // decode JWT
          setUser({ ...parsed, id: decoded.id || decoded.userId }); // use id from token
        }
      }
    } catch (err) {
      console.error("Failed to load user:", err);
      localStorage.removeItem("user");
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
