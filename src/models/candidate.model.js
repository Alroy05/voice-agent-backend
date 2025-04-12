import pool from '../utils/db.js';

export const CandidateModel = {
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM candidates ORDER BY id DESC');
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query('SELECT * FROM candidates WHERE id = $1', [id]);
    return rows[0];
  },

  async create({ name, phone, current_ctc, expected_ctc, notice_period, experience }) {
    const { rows } = await pool.query(
      `INSERT INTO candidates 
       (name, phone, current_ctc, expected_ctc, notice_period, experience) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [name, phone, current_ctc, expected_ctc, notice_period, experience]
    );
    return rows[0];
  },

  async update(id, { name, phone, current_ctc, expected_ctc, notice_period, experience }) {
    const { rows } = await pool.query(
      `UPDATE candidates 
       SET name = $1, phone = $2, current_ctc = $3, 
           expected_ctc = $4, notice_period = $5, experience = $6
       WHERE id = $7 
       RETURNING *`,
      [name, phone, current_ctc, expected_ctc, notice_period, experience, id]
    );
    return rows[0];
  },

  async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM candidates WHERE id = $1 RETURNING *',
      [id]
    );
    return rows[0];
  }
};