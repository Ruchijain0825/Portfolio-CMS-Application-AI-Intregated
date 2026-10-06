import {
  createExperience,
  getExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
} from "../models/experiencemodel.js";

// ======================================================
// CREATE EXPERIENCE
// POST /api/experience
// ======================================================

export const createExperienceController = async (req, res) => {
  try {
    console.log("========== CREATE EXPERIENCE ==========");
    console.log("REQ BODY:", JSON.stringify(req.body, null, 2));

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
      is_active = true,
    } = req.body || {};

    console.log("CHECKING REQUIRED FIELDS:");
    console.log("company_name:", company_name);
    console.log("job_title:", job_title);
    console.log("employment_type:", employment_type);
    console.log("location:", location);
    console.log("start_date:", start_date);

    if (
      !company_name?.trim() ||
      !job_title?.trim() ||
      !employment_type?.trim() ||
      !location?.trim() ||
      !start_date
    ) {
      console.log("❌ REQUIRED FIELD FAILED");

      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
        missing: {
          company_name: !company_name?.trim(),
          job_title: !job_title?.trim(),
          employment_type: !employment_type?.trim(),
          location: !location?.trim(),
          start_date: !start_date,
        },
      });
    }

    const experience = await createExperience(
      company_name.trim(),
      job_title.trim(),
      employment_type.trim(),
      location.trim(),
      start_date,
      end_date || null,
      description || "",
      responsibility || "",
      technologies || [],
      is_current,
      display_order,
      is_active
    );

    return res.status(201).json({
      success: true,
      message: "Experience created successfully",
      experience,
    });

  } catch (error) {
    console.error("CREATE EXPERIENCE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create experience",
    });
  }
};

// ======================================================
// GET ALL EXPERIENCES
// GET /api/experience
// ======================================================

export const getExperiencesController = async (req, res) => {
  try {
    const experiences = await getExperiences();

    return res.status(200).json({
      success: true,
      experiences,
    });
  } catch (error) {
    console.error("GET EXPERIENCES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch experiences",
    });
  }
};

// ======================================================
// GET EXPERIENCE BY ID
// GET /api/experience/:id
// ======================================================

export const getExperienceController = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await getExperienceById(id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    return res.status(200).json({
      success: true,
      experience,
    });
  } catch (error) {
    console.error("GET EXPERIENCE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch experience",
    });
  }
};

// ======================================================
// UPDATE EXPERIENCE
// PUT /api/experience/:id
// ======================================================

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
      is_active = true,
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
        message: "Required fields are missing",
      });
    }

    const experience = await updateExperience(
      company_name,
      job_title,
      employment_type,
      location,
      start_date,
      end_date || null,
      description || "",
      responsibility || "",
      technologies || [],
      is_current,
      display_order,
      is_active,
      id
    );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      experience,
    });
  } catch (error) {
    console.error("UPDATE EXPERIENCE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update experience",
    });
  }
};

// ======================================================
// DELETE EXPERIENCE
// DELETE /api/experience/:id
// ======================================================

export const deleteExperienceController = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await deleteExperience(id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
      experience,
    });
  } catch (error) {
    console.error("DELETE EXPERIENCE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete experience",
    });
  }
};