import { format } from "date-fns";
import { Button, Modal } from "react-bootstrap";

const ViewModal = ({ certificate, handleClose }) => {
  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>View Certificate</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ overflowWrap: "break-word", wordWrap: "break-word" }}>
        <p>
          <strong>Name:</strong> {certificate.name}
        </p>
        <p>
          <strong>Description:</strong> {certificate.description}
        </p>
        <p>
          <strong>Price:</strong> ${certificate.price.toFixed(2)}
        </p>
        <p>
          <strong>Duration:</strong> {certificate.duration}
        </p>
        <p>
          <strong>Create Date:</strong>{" "}
          {format(new Date(certificate.createDate), "yyyy-MM-dd HH:mm:ss")}
        </p>
        <p>
          <strong>Last Update Date:</strong>{" "}
          {format(new Date(certificate.lastUpdateDate), "yyyy-MM-dd HH:mm:ss")}
        </p>
        <p>
          <strong>Tags:</strong>{" "}
          {certificate.tags.map((tag, index) => (
            <span key={tag.id}>
              {tag.name}
              {index !== certificate.tags.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewModal;
