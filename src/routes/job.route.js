import express from 'express';
import { jobController } from '../controllers/job.controller.js';

const router = express.Router();

// GET all jobs
router.get('/', jobController.getAllJobs);

// GET single job
router.get('/:id', jobController.getJobById);

// POST create new job
router.post('/', jobController.createJob);

// PUT update job
router.put('/:id', jobController.updateJob);

// DELETE job
router.delete('/:id', jobController.deleteJob);

export default router;