import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AppContext);

  return currentUser ? <>{children}</> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
