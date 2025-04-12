import express from 'express';
import { appointmentController } from '../controllers/appointment.controller.js';

const router = express.Router();

// GET all appointments
router.get('/', appointmentController.getAllAppointments);

// GET single appointment
router.get('/:id', appointmentController.getAppointmentById);

// POST create new appointment
router.post('/', appointmentController.createAppointment);

// PUT update appointment
router.put('/:id', appointmentController.updateAppointment);

// PATCH update appointment status
router.patch('/:id/status', appointmentController.updateAppointmentStatus);

// DELETE appointment
router.delete('/:id', appointmentController.deleteAppointment);

// GET appointments by candidate
router.get('/candidate/:candidate_id', appointmentController.getAppointmentsByCandidate);

// GET appointments by job
router.get('/job/:job_id', appointmentController.getAppointmentsByJob);

export default router;