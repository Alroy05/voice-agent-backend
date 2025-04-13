import { ConversationModel } from '../models/conversation.model.js';
import { validateConversationInput } from '../middlewares/validation.middleware.js';

export const conversationController = {
  // Create new conversation log
  createConversation: async (req, res, next) => {
    try {
      const { candidate_id, transcript, entities_extracted } = req.body;
      
      // Validate input
      const errors = validateConversationInput({ 
        candidate_id, 
        transcript 
      });
      
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          errors
        });
      }

      const newConversation = await ConversationModel.create({ 
        candidate_id, 
        transcript,
        entities_extracted: entities_extracted || null
      });
      
      res.status(201).json({
        success: true,
        data: newConversation
      });
    } catch (error) {
      next(error);
    }
  },

  // Get all conversations
  getAllConversations: async (req, res, next) => {
    try {
      const conversations = await ConversationModel.getAll();
      res.status(200).json({
        success: true,
        data: conversations
      });
    } catch (error) {
      next(error);
    }
  },

  // Get conversation by ID
  getConversationById: async (req, res, next) => {
    try {
      const conversation = await ConversationModel.getById(req.params.id);
      if (!conversation) {
        return res.status(404).json({
          success: false,
          message: 'Conversation not found'
        });
      }
      res.status(200).json({
        success: true,
        data: conversation
      });
    } catch (error) {
      next(error);
    }
  },

  // Get conversations by candidate ID
  getConversationsByCandidate: async (req, res, next) => {
    try {
      const conversations = await ConversationModel.getByCandidateId(req.params.candidate_id);
      res.status(200).json({
        success: true,
        data: conversations
      });
    } catch (error) {
      next(error);
    }
  }
};