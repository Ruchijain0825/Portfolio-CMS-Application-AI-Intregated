import { createProject,updateProject,deleteProject,getProject,getProjectById, searchProjects } from "../models/projectmodel.js";
export const createProjectController = async(req,res)=>
{
    try
    {
        const{name,description,start_date,end_date,project_type,role,team_project,technologies,github_url,live_url,image_url,is_active,display_order}=req.body;
        if(!name||!description||!start_date||!end_date||!project_type||!role||!technologies||!github_url||!live_url||!image_url||display_order===undefined)
        {
            return res.status(400).json({success:false,message:"fill teh required fields!"})
        }
        const project = await createProject(name,
            description,
            start_date,
            end_date,
            project_type,
            role,
            team_project,
            technologies,
            github_url,
            live_url,
            image_url,
            is_active,
            display_order

        )
        return res.status(201).json({success:true,message:"New Project created successfully"})
    }
   catch(error)
{
    console.log("CREATE PROJECT ERROR:", error);
    return res.status(500).json({
        success:false,
        message:error.message
    })
}
}
export const updateProjectController = async(req,res)=>
{
    const {id} = req.params;
    try
    {
        const{name,description,start_date,end_date,project_type,role,team_project,technologies,github_url,live_url,image_url,is_active,display_order}=req.body;
        if(!id||!name||!description||!start_date||!end_date||!project_type||!role||!technologies||!github_url||!live_url||!image_url||display_order===undefined)
        {
            return res.status(400).json({success:false,message:"fill teh required fields!"})
        }
        const project = await updateProject(
        
            name,
            description,
            start_date,
            end_date,
            project_type,
            role,
            team_project,
            technologies,
            github_url,
            live_url,
            image_url,
            is_active,
            display_order,
            id

        )
        return res.status(200).json({success:true,message:" Project updated successfully"})
    }
    catch(error)

    {
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}
export const deleteProjectController = async(req,res)=>
{
    const {id} = req.params;
    try{
        if(!id)
        {
            return res.status(400).json({success:false,message:"project id is required"})
        }
        const project = await deleteProject(id)
        if(!project)
        {
            return res.status(400).json({success:false,message:"project is not found"})
        }
        return res.status(200).json({success:true,message:"project delete successfully"})
    }
    catch(error)
    {
        console.log(error.message);
        return res.status(500).json({success:false,message:"internal server error"})
    }
}
export const getProjectController = async(req,res)=>
{
    try{
        const projects = await getProject();
        return res.status(200).json({success:true,projects})
    }
    catch(error)
    {
        console.log(error.message);

        return res.status(500).json({success:false,message:"internal server error"})
    }
}
export const getProjectControllerById = async(req,res)=>
{ 
    const {id} = req.params
    try
    {
        const project = await getProjectById(id)
       if(!project)
       {
        return res.status(404).json({success:false,message:"project not found"})
       }

     return res.status(200).json({success:true,project})
}
catch(error)
{
    console.log(error.message);
    return res.status(500).json({success:false,message:"Internal server error"})
}
}

export const searchProjectController = async(req,res)=>
{
    try{
        const{search = "",page =1, limit = 10}=req.query;
        const project = await searchProjects(
            search,
            Number(page),
            Number(limit)
        )
        return res.status(200).json({success:true,page:Number(page),limit:Number(limit),project})
    }
    catch(error)
    {
        console.log(error.message);
        return res.status(500).json({success:false,message:"internal server error"})
    }
}
