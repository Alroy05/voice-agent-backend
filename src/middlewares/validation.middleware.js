export const validateJobInput = ({ title, description, requirements }) => {
  const errors = [];
  
  if (!title || title.trim() === '') {
    errors.push('Title is required');
  } else if (title.length > 255) {
    errors.push('Title must be less than 255 characters');
  }

  if (!description || description.trim() === '') {
    errors.push('Description is required');
  }

  if (!requirements || requirements.trim() === '') {
    errors.push('Requirements are required');
  }

  return errors;
};