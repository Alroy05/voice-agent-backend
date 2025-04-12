import { AppointmentModel } from '../models/appointment.model.js';
import { validateAppointmentInput } from '../middlewares/validation.middleware.js';

export const appointmentController = {
  // Get all appointments
  getAllAppointments: async (req, res, next) => {
    try {
      const appointments = await AppointmentModel.getAll();
      res.status(200).json({
        success: true,
        data: appointments
      });
    } catch (error) {
      next(error);
    }
  },

  // Get single appointment by ID
  getAppointmentById: async (req, res, next) => {
    try {
      const appointment = await AppointmentModel.getById(req.params.id);
      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: 'Appointment not found'
        });
      }
      res.status(200).json({
        success: true,
        data: appointment
      });
    } catch (error) {
      next(error);
    }
  },

  // Create new appointment
  createAppointment: async (req, res, next) => {
    try {
      const { job_id, candidate_id, date_time, status } = req.body;
      
      // Validate input
      const errors = validateAppointmentInput({ 
        job_id, 
        candidate_id, 
        date_time, 
        status 
      });
      
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          errors
        });
      }

      const newAppointment = await AppointmentModel.create({ 
        job_id, 
        candidate_id, 
        date_time, 
        status 
      });
      
      res.status(201).json({
        success: true,
        data: newAppointment
      });
    } catch (error) {
      next(error);
    }
  },

  // Update appointment
  updateAppointment: async (req, res, next) => {
    try {
      const { job_id, candidate_id, date_time, status } = req.body;
      const appointmentId = req.params.id;

      // Validate input
      const errors = validateAppointmentInput({ 
        job_id, 
        candidate_id, 
        date_time, 
        status 
      }, true);
      
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          errors
        });
      }

      const updatedAppointment = await AppointmentModel.update(
        appointmentId, 
        { job_id, candidate_id, date_time, status }
      );
      
      if (!updatedAppointment) {
        return res.status(404).json({
          success: false,
          message: 'Appointment not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: updatedAppointment
      });
    } catch (error) {
      next(error);
    }
  },

  // Update appointment status only
  updateAppointmentStatus: async (req, res, next) => {
    try {
      const { status } = req.body;
      const appointmentId = req.params.id;

      if (!status || !['scheduled', 'completed', 'cancelled', 'rescheduled'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Valid status is required (scheduled/completed/cancelled/rescheduled)'
        });
      }

      const updatedAppointment = await AppointmentModel.updateStatus(
        appointmentId, 
        status
      );
      
      if (!updatedAppointment) {
        return res.status(404).json({
          success: false,
          message: 'Appointment not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: updatedAppointment
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete appointment
  deleteAppointment: async (req, res, next) => {
    try {
      const deletedAppointment = await AppointmentModel.delete(req.params.id);
      if (!deletedAppointment) {
        return res.status(404).json({
          success: false,
          message: 'Appointment not found'
        });
      }
      res.status(200).json({
        success: true,
        data: deletedAppointment
      });
    } catch (error) {
      next(error);
    }
  },

  // Get appointments by candidate ID
  getAppointmentsByCandidate: async (req, res, next) => {
    try {
      const appointments = await AppointmentModel.getByCandidateId(req.params.candidate_id);
      res.status(200).json({
        success: true,
        data: appointments
      });
    } catch (error) {
      next(error);
    }
  },

  // Get appointments by job ID
  getAppointmentsByJob: async (req, res, next) => {
    try {
      const appointments = await AppointmentModel.getByJobId(req.params.job_id);
      res.status(200).json({
        success: true,
        data: appointments
      });
    } catch (error) {
      next(error);
    }
  }
};