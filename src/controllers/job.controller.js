import pool from '../utils/db.js';

export const getJobs = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM jobs');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createJob = async (req, res) => {
  const { title, description, requirements } = req.body;
  
  try {
    const { rows } = await pool.query(
      'INSERT INTO jobs (title, description, requirements) VALUES ($1, $2, $3) RETURNING *',
      [title, description, requirements]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};