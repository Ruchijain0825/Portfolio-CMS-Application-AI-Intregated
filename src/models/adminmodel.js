
import { pool } from "../config/db.js";
export const createAdmin = async(name,email,passwordHash)=>
{
    
        const result = await pool.query(`INSERT INTO admin_users(name,email,password_hash) VALUES ($1,$2,$3) RETURNING id,name,email,password_hash,is_active,created_at`,[name,email,passwordHash]);

        return result.rows[0]
   
}

export const findAdminByEmail = async(email)=>
{
    const result = await pool.query(`SELECT * FROM admin_users where email = $1 LIMIT 1`,[email]);
    return result.rows[0]
}