import React, { useState } from "react";
import { Button, Modal, Form, Badge, Alert } from "react-bootstrap";
import styles from "../styles/header.module.css";
import { addCertificate } from "../../api/certificates/api";
import { getAccessToken } from "../../util/jwt";
import { validateForm } from "../../Certificates/components/util/formUtil";

const AddNew = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    setShow(false);
    resetForm();
  };

  const handleShow = () => setShow(true);

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

  const handleSubmit = async () => {
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

    try {
      await Promise.all([addCertificate(newProduct, getAccessToken())]);
      handleClose();
      window.location.reload();
    } catch (error) {
      setError("An error occurred while adding the certificate.");
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setDuration("");
    setTags([]);
    setNewTag("");
    setError("");
  };

  return (
    <>
      <button className={styles.button} onClick={handleShow}>
        Add new
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={styles.bold}>Add new Certificate</Modal.Title>
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
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddNew;
