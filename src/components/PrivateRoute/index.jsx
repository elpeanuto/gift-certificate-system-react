import React from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "../util/jwt";

const PrivateRoute = ({ children }) => {
  const jwt = getAccessToken();
  return jwt ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
