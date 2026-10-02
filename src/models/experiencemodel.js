import { pool } from "../config/db.js";

// CREATE
export const createExperience = async (
  company_name,
  job_title,
  employment_type,
  location,
  start_date,
  end_date,
  description,
  responsibility,
  technologies,
  is_current,
  display_order,
  is_active
) => {
  const result = await pool.query(
    `
    INSERT INTO experience
    (
      company_name,
      job_title,
      employment_type,
      location,
      start_date,
      end_date,
      description,
      responsibility,
      technologies,
      is_current,
      display_order,
      is_active
    )
    VALUES
    ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
    RETURNING *
    `,
    [
      company_name,
      job_title,
      employment_type,
      location,
      start_date,
      end_date || null,
      description || null,
      responsibility || [],
      technologies || [],
      is_current,
      display_order,
      is_active
    ]
  );

  return result.rows[0];
};


// GET ALL
export const getExperiences = async () => {
  const result = await pool.query(
    `
    SELECT *
    FROM experience
    ORDER BY display_order ASC, created_at DESC
    `
  );

  return result.rows;
};


// GET BY ID
export const getExperienceById = async (id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM experience
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};


// UPDATE
export const updateExperience = async (
  company_name,
  job_title,
  employment_type,
  location,
  start_date,
  end_date,
  description,
  responsibility,
  technologies,
  is_current,
  display_order,
  is_active,
  id
) => {
  const result = await pool.query(
    `
    UPDATE experience
    SET
      company_name = $1,
      job_title = $2,
      employment_type = $3,
      location = $4,
      start_date = $5,
      end_date = $6,
      description = $7,
      responsibility = $8,
      technologies = $9,
      is_current = $10,
      display_order = $11,
      is_active = $12,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $13
    RETURNING *
    `,
    [
      company_name,
      job_title,
      employment_type,
      location,
      start_date,
      end_date || null,
      description || null,
      responsibility || [],
      technologies || [],
      is_current,
      display_order,
      is_active,
      id
    ]
  );

  return result.rows[0];
};


// DELETE
export const deleteExperience = async (id) => {
  const result = await pool.query(
    `
    DELETE FROM experience
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return result.rows[0];
};