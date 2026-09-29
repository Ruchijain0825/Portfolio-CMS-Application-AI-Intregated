import { pool } from "../config/db.js";

export const createAbout = async (
  name,
  title,
  shortBio,
  content,
  profileImage,
  hobbies,
  location,
  email,
  phone,
  resumeurl,
  linked_url,
  github_url
) => {
  const result = await pool.query(
    `INSERT INTO about
    (
      name,
      title,
      short_bio,
      content,
      profile_image,
      hobbies,
      location,
      email,
      phone,
      resumeurl,
      linkedin_url,
      github_url
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
    RETURNING *`,
    [
      name,
      title,
      shortBio,
      content,
      profileImage,
      hobbies,
      location,
      email,
      phone,
      resumeurl,
      linked_url,
      github_url,
    ]
  );

  return result.rows[0];
};


export const updateAbout = async (
  id,
  name,
  title,
  shortBio,
  content,
  profileImage,
  hobbies,
  location,
  email,
  phone,
  resumeurl,
  linked_url,
  github_url
) => {
  const result = await pool.query(
    `UPDATE about
     SET
       name = $1,
       title = $2,
       short_bio = $3,
       content = $4,
       profile_image = COALESCE($5, profile_image),
       hobbies = $6,
       location = $7,
       email = $8,
       phone = $9,
       resumeurl = $10,
       linkedin_url = $11,
       github_url = $12
     WHERE id = $13
     RETURNING *`,
    [
      name,
      title,
      shortBio,
      content,
      profileImage,
      hobbies,
      location,
      email,
      phone,
      resumeurl,
      linked_url,
      github_url,
      id,
    ]
  );

  return result.rows[0];
};


export const getAbout = async () => {
  const result = await pool.query(
    `SELECT * FROM about
     ORDER BY id DESC
     LIMIT 1`
  );

  return result.rows[0];
};