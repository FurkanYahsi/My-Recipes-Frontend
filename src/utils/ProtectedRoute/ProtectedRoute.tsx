import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axiosInstance.get("/auth/check-auth"); 
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return null; 

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
