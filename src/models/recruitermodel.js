import {pool} from "../config/db.js";

// Create recruiter message
export const createRecruiterMessage = async ({
    sender_name,
    sender_email,
    receiver_email,
    subject,
    message
}) => {
    const query = `
        INSERT INTO recruiter_messages
        (
            sender_name,
            sender_email,
            receiver_email,
            subject,
            message
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const values = [
        sender_name,
        sender_email,
        receiver_email,
        subject,
        message
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};
export const getRecruiterMessages = async () => {
    const query = `
        SELECT *
        FROM recruiter_messages
        ORDER BY created_at DESC
    `;

    const result = await pool.query(query);

    return result.rows;
};