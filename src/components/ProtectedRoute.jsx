import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    }
  }, [currentUser]);

  return currentUser ? <>{children}</> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
