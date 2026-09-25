import bcrypt from "bcrypt";
import { createAdmin, findAdminByEmail } from "../models/adminmodel.js";

export const registerAdminService = async (name, email, password) => {
  const existingAdmin = await findAdminByEmail(email);

  if (existingAdmin) {
    throw new Error("Admin already exists");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await createAdmin(name, email, passwordHash);

  return admin;
};


export const loginAdminService = async (email, password) => {
  const admin = await findAdminByEmail(email);

  if (!admin) throw new Error("Invalid email or password");

  const isPasswordValid = await bcrypt.compare(password, admin.password_hash);

  if (!isPasswordValid) throw new Error("Invalid email or password");

  const accessToken = jwt.sign(
    { id: admin.id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: admin.id },
    process.env.REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return {
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
    accessToken,
    refreshToken,
  };
};