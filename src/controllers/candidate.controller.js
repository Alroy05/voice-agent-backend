import { CandidateModel } from '../models/candidate.model.js';
import { validateCandidateInput } from '../middlewares/validation.middleware.js';

export const candidateController = {
  // Get all candidates
  getAllCandidates: async (req, res, next) => {
    try {
      const candidates = await CandidateModel.getAll();
      res.status(200).json({
        success: true,
        data: candidates
      });
    } catch (error) {
      next(error);
    }
  },

  // Get single candidate by ID
  getCandidateById: async (req, res, next) => {
    try {
      const candidate = await CandidateModel.getById(req.params.id);
      if (!candidate) {
        return res.status(404).json({
          success: false,
          message: 'Candidate not found'
        });
      }
      res.status(200).json({
        success: true,
        data: candidate
      });
    } catch (error) {
      next(error);
    }
  },

  // Create new candidate
  createCandidate: async (req, res, next) => {
    try {
      const { name, phone, current_ctc, expected_ctc, notice_period, experience } = req.body;
      
      // Validate input
      const errors = validateCandidateInput({ 
        name, 
        phone, 
        current_ctc, 
        expected_ctc, 
        notice_period, 
        experience 
      });
      
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          errors
        });
      }

      const newCandidate = await CandidateModel.create({ 
        name, 
        phone, 
        current_ctc, 
        expected_ctc, 
        notice_period, 
        experience 
      });
      
      res.status(201).json({
        success: true,
        data: newCandidate
      });
    } catch (error) {
      next(error);
    }
  },

  // Update candidate
  updateCandidate: async (req, res, next) => {
    try {
      const candidateId = req.params.id;
      
      // Get the existing candidate first
      const existingCandidate = await CandidateModel.getById(candidateId);
      
      if (!existingCandidate) {
        return res.status(404).json({
          success: false,
          message: 'Candidate not found'
        });
      }
      
      // Merge existing data with provided updates
      const updatedData = {
        name: req.body.name ?? existingCandidate.name,
        phone: req.body.phone ?? existingCandidate.phone,
        current_ctc: req.body.current_ctc ?? existingCandidate.current_ctc,
        expected_ctc: req.body.expected_ctc ?? existingCandidate.expected_ctc,
        notice_period: req.body.notice_period ?? existingCandidate.notice_period,
        experience: req.body.experience ?? existingCandidate.experience
      };
      
      // Only validate the fields that are being updated
      const fieldsToValidate = {};
      Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
          fieldsToValidate[key] = req.body[key];
        }
      });
      
      if (Object.keys(fieldsToValidate).length > 0) {
        const errors = validateCandidateInput(fieldsToValidate, true);
        if (errors.length > 0) {
          return res.status(400).json({
            success: false,
            errors
          });
        }
      }
      
      const updatedCandidate = await CandidateModel.update(candidateId, updatedData);
      
      res.status(200).json({
        success: true,
        data: updatedCandidate
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete candidate
  deleteCandidate: async (req, res, next) => {
    try {
      const deletedCandidate = await CandidateModel.delete(req.params.id);
      if (!deletedCandidate) {
        return res.status(404).json({
          success: false,
          message: 'Candidate not found'
        });
      }
      res.status(200).json({
        success: true,
        data: deletedCandidate
      });
    } catch (error) {
      next(error);
    }
  }
};