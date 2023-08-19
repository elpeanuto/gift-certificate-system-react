// import React, { useState } from "react";
// import { Button, Modal, Form, Badge, Alert } from "react-bootstrap";
// import styles from "../../Header/styles/header.module.css";
// import { addCertificate } from "../util/api";

// const EditModal = ({ certificate, handleClose }) => {
//   const [show, setShow] = useState(false);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [duration, setDuration] = useState("");
//   const [tags, setTags] = useState([]);
//   const [newTag, setNewTag] = useState("");
//   const [error, setError] = useState("");

//   const handleClose = () => {
//     setShow(false);
//     resetForm();
//   };

//   const handleShow = () => setShow(true);

//   const handleSubmit = () => {
//     if (!validateForm()) {
//       return;
//     }

//     const formattedTags = tags.map((tag) => ({ name: tag }));
//     const newProduct = {
//       name,
//       description,
//       price: parseFloat(price),
//       duration: parseInt(duration, 10),
//       tags: formattedTags,
//     };

//     const jwt = localStorage.getItem("jwt");

//     const isSuccess = addCertificate(newProduct, JSON.parse(jwt).accessesToken);
//     if (isSuccess) {
//       handleClose();
//     } else {
//       setError("An error occurred while adding the certificate.");
//     }
//   };

//   const validateForm = () => {
//     if (!name || !description || !price || !duration) {
//       setError("All fields are required.");
//       return false;
//     }

//     if (name.length < 6 || name.length > 30) {
//       setError("Title must be between 6 and 30 characters.");
//       return false;
//     }

//     if (description.length < 12 || description.length > 1000) {
//       setError("Description must be between 12 and 1000 characters.");
//       return false;
//     }

//     if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
//       setError("Price must be a number greater than 0.");
//       return false;
//     }

//     if (
//       isNaN(parseInt(duration, 10)) ||
//       (parseInt(duration, 10) !== 0 && parseInt(duration, 10) <= 0)
//     ) {
//       setError(
//         "Duration must be a number greater than 0, or 0 for infinite certificates."
//       );
//       return false;
//     }

//     if (newTag.trim() !== "" && (newTag.length < 3 || newTag.length > 15)) {
//       setError("Tag name must be between 3 and 15 characters.");
//       return false;
//     }

//     setError("");
//     return true;
//   };

//   const addTag = () => {
//     if (newTag.trim() !== "" && newTag.length >= 3 && newTag.length <= 15) {
//       setTags([...tags, newTag]);
//       setNewTag("");
//       setError("");
//     } else {
//       setError("Tag name must be between 3 and 15 characters.");
//     }
//   };

//   const removeTag = (tag) => {
//     const updatedTags = tags.filter((t) => t !== tag);
//     setTags(updatedTags);
//   };

//   const resetForm = () => {
//     setName("");
//     setDescription("");
//     setPrice("");
//     setDuration("");
//     setTags([]);
//     setNewTag("");
//     setError("");
//   };

//   return (
//     <>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title className={styles.bold}>Add or Edit</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {error && <Alert variant="danger">{error}</Alert>}
//           <Form>
//             <Form.Group controlId="formName" className="mb-2">
//               <Form.Label className={styles.bold}>Name:</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="formDescription" className="mb-2">
//               <Form.Label className={styles.bold}>Description:</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 placeholder="Enter description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 rows={5}
//               />
//             </Form.Group>
//             <Form.Group controlId="formPrice" className="mb-2">
//               <Form.Label className={styles.bold}>Price:</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter price"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="formDuration" className="mb-2">
//               <Form.Label className={styles.bold}>Duration:</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter duration"
//                 value={duration}
//                 onChange={(e) => setDuration(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="formTags" className="mb-2">
//               <Form.Label className={styles.bold}>Tags:</Form.Label>
//               <div className="d-flex align-items-center">
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter tag"
//                   value={newTag}
//                   onChange={(e) => setNewTag(e.target.value)}
//                 />
//                 <Button variant="primary" onClick={addTag} className="ml-2">
//                   Add Tag
//                 </Button>
//               </div>
//               <div className="mt-2">
//                 {tags.map((tag, index) => (
//                   <Badge
//                     key={index}
//                     variant="secondary"
//                     className="mr-2"
//                     style={{ cursor: "pointer" }}
//                     onClick={() => removeTag(tag)}
//                   >
//                     {tag}
//                   </Badge>
//                 ))}
//               </div>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSubmit}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default EditModal;