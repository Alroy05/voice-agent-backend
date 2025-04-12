import pool from '../utils/db.js';

export const JobModel = {
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM jobs ORDER BY created_at DESC');
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query('SELECT * FROM jobs WHERE id = $1', [id]);
    return rows[0];
  },

  async create({ title, description, requirements }) {
    const { rows } = await pool.query(
      `INSERT INTO jobs (title, description, requirements) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [title, description, requirements]
    );
    return rows[0];
  },

  async update(id, { title, description, requirements }) {
    const { rows } = await pool.query(
      `UPDATE jobs 
       SET title = $1, description = $2, requirements = $3 
       WHERE id = $4 
       RETURNING *`,
      [title, description, requirements, id]
    );
    return rows[0];
  },

  async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM jobs WHERE id = $1 RETURNING *',
      [id]
    );
    return rows[0];
  }
};