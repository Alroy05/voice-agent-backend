import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jobRoutes from './routes/job.routes.js';
import { errorHandler, notFound } from './middlewares/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});