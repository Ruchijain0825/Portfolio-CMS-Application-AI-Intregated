import { pool } from "../config/db.js";


// CREATE EDUCATION
export const createEducation = async (data) => {
  const {
    degree,
    institution,
    fieldOfStudy,
    startYear,
    endYear,
    description,
  } = data;

  const result = await pool.query(
    `
    INSERT INTO education
    (
      degree,
      institution,
      field_of_study,
      start_year,
      end_year,
      description
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    [
      degree,
      institution,
      fieldOfStudy,
      startYear,
      endYear,
      description || null,
    ]
  );

  return result.rows[0];
};


// GET ALL EDUCATION
export const getEducations = async () => {
  const result = await pool.query(
    `
    SELECT *
    FROM education
    ORDER BY start_year DESC
    `
  );

  return result.rows;
};


// GET EDUCATION BY ID
export const getEducationById = async (id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM education
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};


// UPDATE EDUCATION
export const updateEducation = async (id, data) => {
  const {
    degree,
    institution,
    fieldOfStudy,
    startYear,
    endYear,
    description,
  } = data;

  const result = await pool.query(
    `
    UPDATE education
    SET
      degree = $1,
      institution = $2,
      field_of_study = $3,
      start_year = $4,
      end_year = $5,
      description = $6,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $7
    RETURNING *
    `,
    [
      degree,
      institution,
      fieldOfStudy,
      startYear,
      endYear,
      description || null,
      id,
    ]
  );

  return result.rows[0];
};


// DELETE EDUCATION
export const deleteEducation = async (id) => {
  const result = await pool.query(
    `
    DELETE FROM education
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return result.rows[0];
};