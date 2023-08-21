const validateForm = (formData, newTag) => {
  const { name, description, price, duration } = formData;

  if (!name || !description || !price || !duration) {
    return "All fields are required.";
  }

  if (name.length < 6 || name.length > 30) {
    return "Title must be between 6 and 30 characters.";
  }

  if (description.length < 12 || description.length > 1000) {
    return "Description must be between 12 and 1000 characters.";
  }

  if (!/^\d+(\.\d{1,2})?$/.test(price)) {
    return "Price must be a valid number.";
  }

  if (
    !/^\d+$/.test(duration) ||
    (parseInt(duration, 10) !== 0 && parseInt(duration, 10) <= 0)
  ) {
    return "Duration must be a positive integer or 0 for infinite certificates.";
  }

  const trimmedTag = newTag.trim();
  if (trimmedTag !== "" && (trimmedTag.length < 3 || trimmedTag.length > 15)) {
    return "Tag name must be between 3 and 15 characters.";
  }

  return "";
};

export { validateForm };
