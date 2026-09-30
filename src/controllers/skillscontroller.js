import { createskill, getSkills, getSkillsById, updateskill, deleteskill } from "../models/skillmodel.js";

export const createSkillController = async (req, res) => {
  try {
    const { name, category, proficiency, experience_years, icon_url, display_order, is_active } = req.body;

    if (!name || !category || !proficiency || experience_years == undefined || !icon_url || display_order === undefined || is_active === undefined) {
      return res.status(400).json({ success: false, message: "All the fields are mandatory to fill" });
    }

    const skill = await createskill(name, category, proficiency, experience_years, icon_url, display_order, is_active);

    return res.status(201).json({ success: true, message: "Skill added successfully", skill });
  } catch (error) {
  console.error("CREATE SKILL ERROR:", error);

  return res.status(500).json({
    success: false,
    message: error.message,
  });
}
};

export const getSkillController = async (req, res) => {
  try {
    const skills = await getSkills();

    if (skills.length === 0) {
      return res.status(404).json({ success: false, message: "Skills not found" });
    }

    return res.status(200).json({ success: true, skills });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSkillsControllerById = async (req, res) => {
  const { id } = req.params;

  try {
    const skill = await getSkillsById(id);

    if (!skill) {
      return res.status(404).json({ success: false, message: "Skill not found" });
    }

    return res.status(200).json({ success: true, skill });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateSkillController = async (req, res) => {
  const { id } = req.params;

  try {
    const { name, category, proficiency, experience_years, icon_url, display_order, is_active } = req.body;

    if (!name || !category || !proficiency || experience_years == undefined || !icon_url || display_order === undefined || is_active === undefined) {
      return res.status(400).json({ success: false, message: "All the fields are mandatory to fill" });
    }

    const skill = await updateskill(name, category, proficiency, experience_years, icon_url, display_order, is_active, id);

    if (!skill) {
      return res.status(404).json({ success: false, message: "Skill not found" });
    }

    return res.status(200).json({ success: true, message: "Skill updated successfully", skill });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteSkillController = async (req, res) => {
  const { id } = req.params;

  try {
    const skill = await deleteskill(id);

    if (!skill) {
      return res.status(404).json({ success: false, message: "Skill not found" });
    }

    return res.status(200).json({ success: true, message: "Skill deleted successfully", skill });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};