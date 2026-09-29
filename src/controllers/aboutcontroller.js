import { createAbout, updateAbout, getAbout } from "../models/aboutmodel.js";
import { uploadToStorage } from "../services/storageservide.js";

export const createAboutController = async (req, res) => {
  try {
    const { name, title, shortBio, content, location, email, linked_url, github_url, website } = req.body || {};

    if (!name || !title || !shortBio || !content || !location || !email)
      return res.status(400).json({ success: false, message: "Please fill the required fields" });

    let profileImage = null;
    if (req.file) 
      profileImage = await uploadToStorage(req.file, "about");

    const result = await createAbout(
      name, title, shortBio, content, profileImage, null,
      location, email, null, website, linked_url, github_url
    );

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      about: result
    });
  } catch (error) {
    console.error("CREATE ABOUT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};

export const updateAboutController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, shortBio, content, location, email, linked_url, github_url, website } = req.body || {};

    if (!name || !title || !shortBio || !content || !location || !email)
      return res.status(400).json({ success: false, message: "Please fill the required fields" });

    let profileImage = null;
    if (req.file) profileImage = await uploadToStorage(req.file, "about");

    const result = await updateAbout(
      id, name, title, shortBio, content, profileImage, null,
      location, email, null, website, linked_url, github_url
    );

    if (!result)
      return res.status(404).json({ success: false, message: "Profile not found!" });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      about: result
    });
  } catch (error) {
    console.error("UPDATE ABOUT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};

export const getAboutController = async (req, res) => {
  try {
    const result = await getAbout();

    if (!result)
      return res.status(404).json({ success: false, message: "Profile not found" });

    return res.status(200).json({
      success: true,
      about: result
    });
  } catch (error) {
    console.error("GET ABOUT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};