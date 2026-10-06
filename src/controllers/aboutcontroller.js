import {
  createAbout,
  updateAbout,
  getAbout,
} from "../models/aboutmodel.js";

import { uploadToStorage } from "../services/storageservide.js";

// =====================================================
// CREATE ABOUT
// =====================================================

export const createAboutController = async (req, res) => {
  try {
    const {
      name,

      // Support both frontend and backend names
      title,
      headline,

      shortBio,

      content,
      description,

      location,
      email,

      linked_url,
      linkedin,

      github_url,
      github,

      website,
    } = req.body || {};

    // Normalize values
    const finalTitle = title || headline;
    const finalContent = content || description;
    const finalLinkedin = linked_url || linkedin;
    const finalGithub = github_url || github;

    console.log("ABOUT BODY:", req.body);

    if (
      !name ||
      !finalTitle ||
      !shortBio ||
      !finalContent ||
      !location ||
      !email
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill the required fields",
      });
    }

    let profileImage = null;

    if (req.file) {
      profileImage = await uploadToStorage(
        req.file,
        "about"
      );
    }

    const result = await createAbout(
      name,
      finalTitle,
      shortBio,
      finalContent,
      profileImage,
      null,
      location,
      email,
      null,
      website || null,
      finalLinkedin || null,
      finalGithub || null
    );

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      about: result,
    });

  } catch (error) {
    console.error("CREATE ABOUT ERROR:", error);

    return res.status(500).json({
      success: false,
      message:
        error?.message || "Internal server error",
    });
  }
};


// =====================================================
// UPDATE ABOUT
// =====================================================

export const updateAboutController = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,

      title,
      headline,

      shortBio,

      content,
      description,

      location,
      email,

      linked_url,
      linkedin,

      github_url,
      github,

      website,
    } = req.body || {};

    // Normalize values
    const finalTitle = title || headline;
    const finalContent = content || description;
    const finalLinkedin = linked_url || linkedin;
    const finalGithub = github_url || github;

    console.log("UPDATE ABOUT BODY:", req.body);

    if (
      !name ||
      !finalTitle ||
      !shortBio ||
      !finalContent ||
      !location ||
      !email
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill the required fields",
      });
    }

    let profileImage = null;

    if (req.file) {
      profileImage = await uploadToStorage(
        req.file,
        "about"
      );
    }

    const result = await updateAbout(
      id,
      name,
      finalTitle,
      shortBio,
      finalContent,
      profileImage,
      null,
      location,
      email,
      null,
      website || null,
      finalLinkedin || null,
      finalGithub || null
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Profile not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      about: result,
    });

  } catch (error) {
    console.error("UPDATE ABOUT ERROR:", error);

    return res.status(500).json({
      success: false,
      message:
        error?.message || "Internal server error",
    });
  }
};


// =====================================================
// GET ABOUT
// =====================================================

export const getAboutController = async (req, res) => {
  try {
    const result = await getAbout();

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      about: result,
    });

  } catch (error) {
    console.error("GET ABOUT ERROR:", error);

    return res.status(500).json({
      success: false,
      message:
        error?.message || "Internal server error",
    });
  }
};