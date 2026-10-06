import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from './routes/authroute.js'
import aboutRoutes from './routes/aboutroute.js'
import projectRoutes from './routes/projectroute.js'
import skillRoutes from './routes/skillroute.js'
import experienceRoutes from "./routes/experienceroute.js";
import educationRoutes from "./routes/educationroute.js";
import recruiterRoutes from  "./routes/recruiterroute.js"
const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.PORTFOLIO_URL||"https://porfolio-cms-application-frontend-i7i96kuyy-ruchi5.vercel.app/"
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("REQUEST ORIGIN:", origin);
      console.log("ALLOWED ORIGINS:", allowedOrigins);

      // Postman / direct server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio CMS API is running",
  });
});

app.use("/auth", authRoutes);
app.use("/admin",aboutRoutes);
app.use("/project",projectRoutes);
app.use("/skill",skillRoutes);
app.use("/experience", experienceRoutes);
app.use("/education", educationRoutes)
app.use("/recruiter-message",recruiterRoutes);

export default app;