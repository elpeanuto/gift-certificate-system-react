import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "../util/jwt";
import { isAdmin } from "../api/jwt/api";

const PrivateRoute = ({ children }) => {
  const jwt = getAccessToken();
  const [isAdminUser, setIsAdminUser] = useState(null);

  useEffect(() => {
    async function checkAdminStatus() {
      try {
        const response = await isAdmin(jwt);
        setIsAdminUser(response);
      } catch (error) {
        setIsAdminUser(false);
      }
    }

    checkAdminStatus();
  }, [jwt]);

  if (isAdminUser === null) {
    return null;
  }

  if (isAdminUser) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
