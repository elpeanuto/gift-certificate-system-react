import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../util/jwt";
import { isAdmin } from "../api/jwt/api";

const PrivateRoute = ({ children }) => {
  const jwt = getAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwt) {
      navigate("/login");
    } else {
      async function checkAdminStatus() {
        try {
          const response = await isAdmin(jwt);
          if (!response) {
            navigate("/login");
          }
        } catch (error) {
          console.error(error);
          navigate("/login");
        }
      }
  
      checkAdminStatus();
    }
  }, [jwt, navigate]);
  
  return children;
};

export default PrivateRoute;
