import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles/header.module.css";
import AddNew from "./components/AddNew";
import jwt_decode from "jwt-decode";
import { getAccessToken, setToken } from "../util/jwt";

const Header = () => {
  const location = useLocation();
  const showButtons = location.pathname === "/certificates";
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (showButtons) {
      const token = getAccessToken();
      const decoded = jwt_decode(token);
      setEmail(decoded.sub);
    }
  }, []);

  return (
    <header className={styles.header}>
      Admin UI
      {showButtons && (
        <>
          <AddNew />
          <div className={styles.profileContainer}>
            {email}
            <button
              className={styles.button}
              onClick={() => {
                setToken(null);
                window.location.href = "login";
              }}
            >
              Logout
            </button>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
