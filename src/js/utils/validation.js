import DOMPurify from "dompurify";

/**
 * Validates and sanitizes all inputs
 * @param {*} formData - all form info
 * @param {*} fields - an array of fields
 * @returns
 */
export const inputValidation = (formData, fields) => {
  const image = formData.get("ImageUpload");

  // Loop through text fields and sanitize their values
  for (let field of fields) {
    const value = formData.get(field);
    const sanitizedValue = DOMPurify.sanitize(value, { ALLOWED_TAGS: [] }); // Sanitize text field with no allowed tags
    formData.set(field, sanitizedValue); // Update form data with sanitized value

    if (!sanitizedValue || sanitizedValue.trim() === "") {
      alert("Please fill in all fields.");
      return false; // Validation failed
    }
  }

  // Check if image is uploaded
  if (!image || image.size === 0) {
    alert("Please upload an image.");
    return false; // Validation failed
  }

  // Check if image size is greater than 5 MB
  const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
  if (image.size > maxSizeInBytes) {
    alert("File size exceeds the limit (5 MB). Please select a smaller file.");
    return false; // Validation failed
  }

  // If all fields are filled and image size is within the limit, validation passes
  return true;
};
