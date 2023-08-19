import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles/header.module.css";
import AddNew from "./components/AddNew";
import useLocalState from "../util/useLocalStateHook";
import jwt_decode from "jwt-decode";

const Header = () => {
  const location = useLocation();
  const showButtons = location.pathname === "/certificates";
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (showButtons) {
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
                setJwt(null);
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
