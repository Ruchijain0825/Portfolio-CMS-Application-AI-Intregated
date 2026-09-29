import { pool } from "../config/db.js";
export const createProject = async(name,description,start_date,end_date,project_type,role,team_project,technologies,github_url,live_url,image_url,is_active,display_order)=>
{
   const result = await pool.query(`INSERT INTO projects(name,description,start_date,end_date,project_type,role,team_project,technologies,github_url,live_url,image_url,is_active,display_order) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING*`,
    [name,description,start_date,end_date,project_type,role,team_project,technologies,github_url,live_url,image_url,is_active,display_order])

    return result.rows[0];
}
export const getProject = async()=>
{
    const result = await pool.query(`SELECT * FROM projects`);
    return result.rows;
}
export const updateProject = async(name,description,start_date,end_date,project_type,role,team_project,technologies,github_url,live_url,image_url,is_active,display_order,id)=>
{
    const result = await pool.query(`UPDATE projects SET name =$1
        ,description = $2
        ,start_date = $3
        ,end_date =$4
        ,project_type =$5
        ,role = $6
        ,team_project = $7
        ,technologies =$8
        ,github_url =$9
        ,live_url =$10
        ,image_url =$11
        ,is_active =$12
        ,display_order =$13
        ,updated_at = CURRENT_TIMESTAMP
        WHERE id = $14  RETURNING * `,[name,description,start_date,end_date,project_type,role,team_project,technologies,github_url,live_url,image_url,is_active,display_order,id])

        return result.rows[0]
}
export const deleteProject = async (id) => {
  const result = await pool.query(
    `DELETE FROM projects
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};
export const getProjectById = async(id)=>
{
    const result = await pool.query(`SELECT * FROM projects where  id = $1`,[id]);
    return result.rows[0]
}
export const searchProjects = async(search,page,limit)=>
{
    const offset = (page-1)*limit;
    const result = await pool.query(`SELECT * FROM projects WHERE name ILIKE $1
        OR description ILIKE $1
        OR project_type ILIKE $1
        OR technologies ILIKE $1
        ORDER BY created_at DESC
        LIMIT $2 OFFSET $3
        `,
    [`%${search}%`,limit,offset])
    return result.rows
}