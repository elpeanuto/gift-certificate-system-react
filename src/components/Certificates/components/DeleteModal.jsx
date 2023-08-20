import React from "react";
import { Button, Modal } from "react-bootstrap";
import { getAccessToken } from "../../util/jwt";
import { deleteCertificate } from "../../api/certificates/api";

const DeleteModal = ({certificate, handleClose}) => {
  const handleDeleteCertificate = async () => {
    if (certificate) {
      try {
        const deleteUrl = certificate.links.find(
          (link) => link.rel === "delete"
        ).href;

        deleteCertificate(deleteUrl, getAccessToken());
        handleClose();
      } catch (error) {
        console.error("Error deleting certificate:", error);
      }
    }
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Certificate</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this certificate?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeleteCertificate}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
