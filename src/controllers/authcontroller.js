import { loginAdminService  } from "../services/authservice.js";
import { pool } from "../config/db.js";
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    if(email!==process.env.ADMIN_USER || password!==process.env.ADMIN_PASSWORD)
    {
      console.log("Password match:", email=== process.env.ADMIN_USER);
      console.log("Password match:", password === process.env.ADMIN_PASSWORD);
    return res.status(401).json({success:false,message:"Invalid email and password"});
    console.log("api hit")
  }
    const result = await loginAdminService(email, password);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      ...result,
    });
  
 } catch (error) {
    console.error("Login Admin Error:", error.message);

    if (error.message === "Invalid email or password") {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};