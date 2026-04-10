import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";
export default function RequireAuth({ children }) {
  const [authStatus, setAuthStatus] = useState('checking');
  const token = localStorage.getItem("token");

  useEffect(() => {                      
  async function verifyAuth() {
    if (!token) {
      setAuthStatus('notAuthenticated');
      return;
    }
    try {
      await api.get("/profile");
      setAuthStatus('authenticated');
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // we don't want to store the invalid token in localstorage
      setAuthStatus('notAuthenticated');
    }
  }
  verifyAuth();
  }, [token]);

  if(authStatus === 'checking') {
    return <div>Loading...</div>;
  }
  if (authStatus === 'notAuthenticated') {

    return <Navigate to="/login" replace />;
  }

  return children;
}
//this is needed so that only authenticated users can access the dashboard
//not everyone can access the dashboard