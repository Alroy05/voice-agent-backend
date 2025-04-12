import { JobModel } from '../models/job.model.js';
import { validateJobInput } from '../middlewares/validation.middleware.js';

export const jobController = {
  // Get all jobs
  getAllJobs: async (req, res, next) => {
    try {
      const jobs = await JobModel.getAll();
      res.status(200).json({
        success: true,
        data: jobs
      });
    } catch (error) {
      next(error);
    }
  },

  // Get single job by ID
  getJobById: async (req, res, next) => {
    try {
      const job = await JobModel.getById(req.params.id);
      if (!job) {
        return res.status(404).json({
          success: false,
          message: 'Job not found'
        });
      }
      res.status(200).json({
        success: true,
        data: job
      });
    } catch (error) {
      next(error);
    }
  },

  // Create new job
  createJob: async (req, res, next) => {
    try {
      const { title, description, requirements } = req.body;
      
      // Validate input
      const errors = validateJobInput({ title, description, requirements });
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          errors
        });
      }

      const newJob = await JobModel.create({ title, description, requirements });
      res.status(201).json({
        success: true,
        data: newJob
      });
    } catch (error) {
      next(error);
    }
  },

  // Update job
  updateJob: async (req, res, next) => {
    try {
      const { title, description, requirements } = req.body;
      const jobId = req.params.id;

      // Validate input
      const errors = validateJobInput({ title, description, requirements });
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          errors
        });
      }

      const updatedJob = await JobModel.update(jobId, { title, description, requirements });
      if (!updatedJob) {
        return res.status(404).json({
          success: false,
          message: 'Job not found'
        });
      }
      res.status(200).json({
        success: true,
        data: updatedJob
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete job
  deleteJob: async (req, res, next) => {
    try {
      const deletedJob = await JobModel.delete(req.params.id);
      if (!deletedJob) {
        return res.status(404).json({
          success: false,
          message: 'Job not found'
        });
      }
      res.status(200).json({
        success: true,
        data: deletedJob
      });
    } catch (error) {
      next(error);
    }
  }
};