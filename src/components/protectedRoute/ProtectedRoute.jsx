import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import React from "react";

const ProtectedRoute = ({ children }) => {
  const [cookies] = useCookies(["cookie-name"]);

  if (cookies.jwt) {
    return children;
  }
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
