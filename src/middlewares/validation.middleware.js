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


export const validateCandidateInput = (
  { name, phone, current_ctc, expected_ctc, notice_period, experience },
  isUpdate = false
) => {
  const errors = [];
  
  if (!isUpdate || name !== undefined) {
    if (!name || name.trim() === '') {
      errors.push('Name is required');
    } else if (name.length > 255) {
      errors.push('Name must be less than 255 characters');
    }
  }

  if (!isUpdate || phone !== undefined) {
    if (!phone || phone.trim() === '') {
      errors.push('Phone number is required');
    } else if (!/^[0-9]{10,15}$/.test(phone)) {
      errors.push('Phone number must be 10-15 digits');
    }
  }

  if (current_ctc !== undefined && isNaN(current_ctc)) {
    errors.push('Current CTC must be a number');
  }

  if (expected_ctc !== undefined && isNaN(expected_ctc)) {
    errors.push('Expected CTC must be a number');
  }

  if (notice_period !== undefined && isNaN(notice_period)) {
    errors.push('Notice period must be a number (days)');
  }

  if (experience !== undefined && isNaN(experience)) {
    errors.push('Experience must be a number (years)');
  }

  return errors;
};

export const validateAppointmentInput = (
  { job_id, candidate_id, date_time, status },
  isUpdate = false
) => {
  const errors = [];
  
  if (!isUpdate || job_id !== undefined) {
    if (!job_id || isNaN(job_id)) {
      errors.push('Valid job ID is required');
    }
  }

  if (!isUpdate || candidate_id !== undefined) {
    if (!candidate_id || isNaN(candidate_id)) {
      errors.push('Valid candidate ID is required');
    }
  }

  if (!isUpdate || date_time !== undefined) {
    if (!date_time || isNaN(new Date(date_time).getTime())) {
      errors.push('Valid date/time is required');
    }
  }

  if (status !== undefined && !['scheduled', 'completed', 'cancelled', 'rescheduled'].includes(status)) {
    errors.push('Status must be one of: scheduled, completed, cancelled, rescheduled');
  }

  return errors;
};