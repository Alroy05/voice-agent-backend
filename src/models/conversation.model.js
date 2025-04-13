import pool from '../utils/db.js';

export const ConversationModel = {
  async create({ candidate_id, transcript, entities_extracted }) {
    const { rows } = await pool.query(
      `INSERT INTO conversations 
       (candidate_id, transcript, entities_extracted) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [candidate_id, transcript, entities_extracted]
    );
    return rows[0];
  },

  async getByCandidateId(candidate_id) {
    const { rows } = await pool.query(
      `SELECT * FROM conversations 
       WHERE candidate_id = $1`,
      [candidate_id]
    );
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM conversations WHERE id = $1',
      [id]
    );
    return rows[0];
  },

  async getAll() {
    const { rows } = await pool.query(
      `SELECT c.*, cd.name as candidate_name 
       FROM conversations c
       JOIN candidates cd ON c.candidate_id = cd.id`
    );
    return rows;
  }
};