import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import jobRoute from './routes/job.route.js';
import candidateRoute from './routes/candidate.route.js';
import appointmentRoute from './routes/appointment.route.js';
import conversationRoute from './routes/conversation.route.js';
import { errorHandler, notFound } from './middlewares/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/jobs', jobRoute);
app.use('/api/candidates', candidateRoute);
app.use('/api/appointments', appointmentRoute);
app.use('/api/conversations', conversationRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});