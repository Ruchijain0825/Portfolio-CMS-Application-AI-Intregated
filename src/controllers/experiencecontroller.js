import {
    createExperience,
    getExperiences,
    getExperienceById,
    updateExperience,
    deleteExperience
} from "../models/experiencemodel.js";


// POST /api/experience
import {
  createExperience,
  getExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience
} from "../models/experiencemodel.js";

// POST /api/experience
export const createExperienceController = async (req, res) => {
  try {
    const {
      company_name,
      job_title,
      employment_type,
      location,
      start_date,
      end_date,
      description,
      responsibility,
      technologies,
      is_current = false,
      is_active = true
    } = req.body;

    // Required fields
    if (
      !company_name ||
      !job_title ||
      !employment_type ||
      !location ||
      !start_date
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing"
      });
    }

    const experience = await createExperience(
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
      is_active
    );

    return res.status(201).json({
      success: true,
      message: "Experience created successfully",
      experience
    });

  } catch (error) {
    console.error("CREATE EXPERIENCE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create experience"
    });
  }
};

// GET /api/experience
export const getExperiencesController = async (req, res) => {
    try {

        const experiences = await getExperiences();

        return res.status(200).json({
            success: true,
            experiences
        });

    } catch (error) {

        console.error("GET EXPERIENCES ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch experiences"
        });
    }
};


// GET /api/experience/:id
export const getExperienceController = async (req, res) => {
    try {

        const { id } = req.params;

        const experience = await getExperienceById(id);

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "Experience not found"
            });
        }

        return res.status(200).json({
            success: true,
            experience
        });

    } catch (error) {

        console.error("GET EXPERIENCE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch experience"
        });
    }
};


// PUT /api/experience/:id
export const updateExperienceController = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            company_name,
            job_title,
            employment_type,
            location,
            start_date,
            end_date,
            description,
            responsibility,
            technologies,
            is_current = false,
            display_order = 0,
            is_active = true
        } = req.body;

        const experience = await updateExperience(
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
        );

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "Experience not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Experience updated successfully",
            experience
        });

    } catch (error) {

        console.error("UPDATE EXPERIENCE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update experience"
        });
    }
};


// DELETE /api/experience/:id
export const deleteExperienceController = async (req, res) => {
    try {

        const { id } = req.params;

        const experience = await deleteExperience(id);

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "Experience not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Experience deleted successfully"
        });

    } catch (error) {

        console.error("DELETE EXPERIENCE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete experience"
        });
    }
};