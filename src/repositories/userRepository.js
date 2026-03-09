import pool from '../config/db.js';

export const findByUsername = async username => {
  const result = await pool.query('SELECT * FROM "User" WHERE username = $1', [
    username,
  ]);
  return result.rows[0];
};

export const create = async (username, hashedWeight) => {
  const result = await pool.query(
    'INSERT INTO "User" (username, password) VALUES ($1, $2) RETURNING id, username',
    [username, hashedWeight],
  );
  return result.rows[0];
};
