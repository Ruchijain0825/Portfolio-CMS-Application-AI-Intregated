import supabase from "../config/supabse.js";

const BUCKET_NAME = "portfolio";

export const uploadToStorage = async (file, folder = "images") => {
  if (!file) {
    throw new Error("File is required!");
  }

  const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;
  const filePath = `${folder}/${fileName}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return data.publicUrl;
};