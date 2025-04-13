import express from 'express';
import { conversationController } from '../controllers/conversation.controller.js';

const router = express.Router();

// POST create conversation log
router.post('/', conversationController.createConversation);

// GET all conversations
router.get('/', conversationController.getAllConversations);

// GET single conversation
router.get('/:id', conversationController.getConversationById);

// GET conversations by candidate
router.get('/candidate/:candidate_id', conversationController.getConversationsByCandidate);

export default router;