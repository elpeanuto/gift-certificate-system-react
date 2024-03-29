import React, { useState } from "react";
import { updateCertificate } from "../../api/certificates/api";
import { getAccessToken } from "../../util/jwt";
import { validateForm } from "./util/formUtil";
import CertificateForm from "./CertificateForm";

const EditModal = ({ certificate, handleClose }) => {
  const [name, setName] = useState(certificate.name);
  const [description, setDescription] = useState(certificate.description);
  const [price, setPrice] = useState(certificate.price);
  const [duration, setDuration] = useState(certificate.duration);
  const [tags, setTags] = useState(certificate.tags.map((tag) => tag.name));
  const [newTag, setNewTag] = useState("");
  const [error, setError] = useState("");

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
    <CertificateForm
      title={`Edit Certificate with id = ${certificate.id}`}
      certificate={certificate}
      handleClose={handleClose}
      handleSave={handleSave}
      name={name}
      setName={setName}
      description={description}
      setDescription={setDescription}
      price={price}
      setPrice={setPrice}
      duration={duration}
      setDuration={setDuration}
      tags={tags}
      setTags={setTags}
      newTag={newTag}
      setNewTag={setNewTag}
      error={error}
      setError={setError}
    />
  );
};

export default EditModal;
