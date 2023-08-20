import React, { useState } from "react";
import { Modal, Button, Form, Badge } from "react-bootstrap";
import styles from "../../Header/styles/header.module.css";

const EditModal = ({ certificate, handleClose }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [error, setError] = useState("");
  // Add other states for the fields you want to edit
  const removeTag = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };
  const handleSave = () => {
    // Implement your save logic here using API calls or state management
    // You can use the updated state values to send the edited data to the server
    // After saving, close the modal using handleClose()
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Certificate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName" className="mb-2">
            <Form.Label className={styles.bold}>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={certificate.name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDescription" className="mb-2">
            <Form.Label className={styles.bold}>Description:</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            />
          </Form.Group>
          <Form.Group controlId="formPrice" className="mb-2">
            <Form.Label className={styles.bold}>Price:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDuration" className="mb-2">
            <Form.Label className={styles.bold}>Duration:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formTags" className="mb-2">
            <Form.Label className={styles.bold}>Tags:</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type="text"
                placeholder="Enter tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <Button variant="primary" onClick={() => ""} className="ml-2">
                Add Tag
              </Button>
            </div>
            <div className="mt-2">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="mr-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => removeTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
