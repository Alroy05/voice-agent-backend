export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Handle database errors
  if (err.code === '23505') { // Unique violation
    return res.status(400).json({
      success: false,
      message: 'Duplicate entry - this job title may already exist'
    });
  }

  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
};