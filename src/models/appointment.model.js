import pool from '../utils/db.js';

export const AppointmentModel = {
  async getAll() {
    const { rows } = await pool.query(`
      SELECT a.*, j.title as job_title, c.name as candidate_name 
      FROM appointments a
      JOIN jobs j ON a.job_id = j.id
      JOIN candidates c ON a.candidate_id = c.id
      ORDER BY a.date_time DESC
    `);
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query(`
      SELECT a.*, j.title as job_title, c.name as candidate_name 
      FROM appointments a
      JOIN jobs j ON a.job_id = j.id
      JOIN candidates c ON a.candidate_id = c.id
      WHERE a.id = $1
    `, [id]);
    return rows[0];
  },

  async create({ job_id, candidate_id, date_time, status = 'scheduled' }) {
    const { rows } = await pool.query(
      `INSERT INTO appointments 
       (job_id, candidate_id, date_time, status) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [job_id, candidate_id, date_time, status]
    );
    return rows[0];
  },

  async update(id, { job_id, candidate_id, date_time, status }) {
    const { rows } = await pool.query(
      `UPDATE appointments 
       SET job_id = $1, candidate_id = $2, date_time = $3, status = $4
       WHERE id = $5 
       RETURNING *`,
      [job_id, candidate_id, date_time, status, id]
    );
    return rows[0];
  },

  async updateStatus(id, status) {
    const { rows } = await pool.query(
      `UPDATE appointments 
       SET status = $1 
       WHERE id = $2 
       RETURNING *`,
      [status, id]
    );
    return rows[0];
  },

  async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM appointments WHERE id = $1 RETURNING *',
      [id]
    );
    return rows[0];
  },

  async getByCandidateId(candidate_id) {
    const { rows } = await pool.query(
      `SELECT a.*, j.title as job_title 
       FROM appointments a
       JOIN jobs j ON a.job_id = j.id
       WHERE a.candidate_id = $1
       ORDER BY a.date_time DESC`,
      [candidate_id]
    );
    return rows;
  },

  async getByJobId(job_id) {
    const { rows } = await pool.query(
      `SELECT a.*, c.name as candidate_name 
       FROM appointments a
       JOIN candidates c ON a.candidate_id = c.id
       WHERE a.job_id = $1
       ORDER BY a.date_time DESC`,
      [job_id]
    );
    return rows;
  }
};