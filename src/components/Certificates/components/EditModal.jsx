import React, { useState } from "react";
import { Modal, Button, Form, Badge, Alert } from "react-bootstrap";
import styles from "../../Header/styles/header.module.css";
import { updateCertificate } from "../../api/certificates/api";
import { getAccessToken } from "../../util/jwt";
import { validateForm } from "./util/formUtil";

const EditModal = ({ certificate, handleClose }) => {
  const [name, setName] = useState(certificate.name);
  const [description, setDescription] = useState(certificate.description);
  const [price, setPrice] = useState(certificate.price);
  const [duration, setDuration] = useState(certificate.duration);
  const [tags, setTags] = useState(certificate.tags.map((tag) => tag.name));
  const [newTag, setNewTag] = useState("");
  const [error, setError] = useState("");

  const removeTag = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  const addTag = () => {
    if (newTag.trim() !== "" && newTag.length >= 3 && newTag.length <= 15) {
      setTags([...tags, newTag]);
      setNewTag("");
      setError("");
    } else {
      setError("Tag name must be between 3 and 15 characters.");
    }
  };

  const handleSave = async () => {
    const validationError = validateForm(
      {
        name,
        description,
        price,
        duration,
        tags,
      },
      newTag
    );

    if (validationError) {
      setError(validationError);
      return;
    }

    const formattedTags = tags.map((tag) => ({ name: tag }));
    const newProduct = {
      name,
      description,
      price: parseFloat(price),
      duration: parseInt(duration, 10),
      tags: formattedTags,
    };

    const updateLink = certificate.links.find(
      (link) => link.rel === "update"
    ).href;

    try {
      await Promise.all([
        updateCertificate(newProduct, updateLink, getAccessToken()),
      ]);
      handleClose();
      window.location.reload();
    } catch (error) {
      setError("An error occurred while adding the certificate.");
    }
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Certificate with id = {certificate.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group controlId="formName" className="mb-2">
            <Form.Label className={styles.bold}>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
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
                style={{ flex: 1 }}
              />
              <Button
                variant="primary"
                onClick={addTag}
                className="ml-2"
                style={{ height: "100%", flexShrink: 0 }}
              >
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
