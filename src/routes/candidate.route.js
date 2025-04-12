import express from 'express';
import { candidateController } from '../controllers/candidate.controller.js';

const router = express.Router();

// GET all candidates
router.get('/', candidateController.getAllCandidates);

// GET single candidate
router.get('/:id', candidateController.getCandidateById);

// POST create new candidate
router.post('/', candidateController.createCandidate);

// PUT update candidate
router.put('/:id', candidateController.updateCandidate);

// DELETE candidate
router.delete('/:id', candidateController.deleteCandidate);

export default router;