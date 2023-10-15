import { useEffect, useState } from "react";
import { getAccessToken } from "../util/jwt";
import { isAdmin } from "../api/jwt/api";

const PrivateRoute = ({ children }) => {
  const [isAdminCheckCompleted, setIsAdminCheckCompleted] = useState(false);
  const jwt = getAccessToken();

  useEffect(() => {
    if (!jwt) {
      window.location.href = "/login";
    } else {
      async function checkAdminStatus() {
        try {
          const response = await isAdmin(jwt);
          if (!response) {
            window.location.href = "/login";
          }
          setIsAdminCheckCompleted(true);
        } catch (error) {
          console.error(error);
          window.location.href = "/login";
          setIsAdminCheckCompleted(true); 
        }
      }

      checkAdminStatus();
    }
  }, [jwt]);

  if (!isAdminCheckCompleted) {
    return null;
  }

  return children;
};

export default PrivateRoute;
