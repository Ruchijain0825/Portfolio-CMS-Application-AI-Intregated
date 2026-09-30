import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from './routes/authroute.js'
import aboutRoutes from './routes/aboutroute.js'
import projectRoutes from './routes/projectroute.js'
import skillRoutes from './routes/skillroute.js'
const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
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

app.use("/api/auth", authRoutes);
app.use("/api/admin",aboutRoutes);
app.use("/api/project",projectRoutes);
app.use("/api/skill",skillRoutes)

export default app;