import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles/header.module.css";
import AddNew from "../Certificates/components/AddNew";
import jwt_decode from "jwt-decode";
import { getAccessToken, setToken } from "../util/jwt";

const Header = () => {
  const location = useLocation();
  const showButtons = location.pathname === "/certificates";
  const [email, setEmail] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  useEffect(() => {
    if (showButtons) {
      const token = getAccessToken();
      const decoded = jwt_decode(token);
      setEmail(decoded.sub);
    }
  }, [showButtons]);

  return (
    <header className={styles.header}>
      Admin UI
      {showButtons && (
        <>
          <button
            className={styles.button}
            onClick={() => handleShowAddModal()}
          >
            Add new
          </button>
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

          {showAddModal && (
            <AddNew
              certificate={{
                name: "",
                description: "",
                price: "",
                duration: "",
                tags: [],
              }}
              handleClose={() => setShowAddModal(false)}
            />
          )}
        </>
      )}
    </header>
  );
};

export default Header;
