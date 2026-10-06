import {
  createEducation,
  getEducations,
  getEducationById,
  updateEducation,
  deleteEducation,
} from "../models/educationmodel.js";



export const createEducationController = async (req, res) => {
  try {
    const {
      degree,
      institution,
      field_of_study,
      start_year,
      end_year,
      description,
    } = req.body;

    if (
      !degree ||
      !institution ||
      !field_of_study ||
      !start_year ||
      !end_year
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const education = await createEducation({
      degree,
      institution,
      fieldOfStudy: field_of_study,
      startYear: start_year,
      endYear: end_year,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Education created successfully",
      data: education,
    });

  } catch (error) {
  console.error("CREATE EDUCATION ERROR:", error);

  return res.status(500).json({
    success: false,
    message: error.message,
  });
}
};


// GET /api/education
export const getEducationsController = async (req, res) => {
  try {

    const educations = await getEducations();

    return res.status(200).json({
      success: true,
      data: educations,
    });

  } catch (error) {
    console.error("GET EDUCATIONS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch education",
    });
  }
};


// GET /api/education/:id
export const getEducationController = async (req, res) => {
  try {

    const { id } = req.params;

    const education = await getEducationById(id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: education,
    });

  } catch (error) {
    console.error("GET EDUCATION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch education",
    });
  }
};


// PUT /api/education/:id
export const updateEducationController = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      degree,
      institution,
      field_of_study,
      start_year,
      end_year,
      description,
    } = req.body;

    if (
      !degree ||
      !institution ||
      !field_of_study ||
      !start_year ||
      !end_year
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const education = await updateEducation(
      id,
      {
        degree,
        institution,
        fieldOfStudy: field_of_study,
        startYear: start_year,
        endYear: end_year,
        description,
      }
    );

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Education updated successfully",
      data: education,
    });

  } catch (error) {
    console.error("UPDATE EDUCATION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update education",
    });
  }
};


// DELETE /api/education/:id
export const deleteEducationController = async (req, res) => {
  try {

    const { id } = req.params;

    const education = await deleteEducation(id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Education deleted successfully",
    });

  } catch (error) {
    console.error("DELETE EDUCATION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete education",
    });
  }
};