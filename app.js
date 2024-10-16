import dotenv from 'dotenv';
import express from "express";
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import studentRoutes from './routes/studentRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());


// Connect to MongoDB
connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
  
  // Routes
  app.use("/api/students", studentRoutes);
  
  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    