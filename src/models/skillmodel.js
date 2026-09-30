import { pool } from "../config/db.js";

export const getSkills = async () => {
  const result = await pool.query(`SELECT * FROM skills WHERE is_active = true ORDER BY display_order ASC, created_at DESC`);
  return result.rows;
};

export const getSkillsById = async (id) => {
  const result = await pool.query(`SELECT * FROM skills WHERE id = $1 AND is_active = true`, [id]);
  return result.rows[0];
};

export const createskill = async (name, category, proficiency, experience_years, icon_url, display_order, is_active) => {
  const result = await pool.query(`INSERT INTO skills (name, category, proficiency, experience_years, icon_url, display_order, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [name, category, proficiency, experience_years, icon_url, display_order, is_active]);
  return result.rows[0];
};

export const updateskill = async (name, category, proficiency, experience_years, icon_url, display_order, is_active, id) => {
  const result = await pool.query(`UPDATE skills SET name = $1, category = $2, proficiency = $3, experience_years = $4, icon_url = $5, display_order = $6, is_active = $7, updated_at = CURRENT_TIMESTAMP WHERE id = $8 RETURNING *`, [name, category, proficiency, experience_years, icon_url, display_order, is_active, id]);
  return result.rows[0];
};

export const deleteskill = async (id) => {
  const result = await pool.query(`DELETE FROM skills WHERE id = $1 RETURNING *`, [id]);
  return result.rows[0];
};