import express, { Request, Response, NextFunction, Errback } from "express";
import cors from "cors";
import dotenv from "dotenv";

import mongoose from "mongoose";
import logger from "./utils/logger";
import bookingRoutes from "./routes/booking.routes";
import locationsRoutes from "./routes/location.routes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/locations", locationsRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message); // Logs error to console & file
  res.status(500).json({ message: err.message });
});

// Write to a file



export default app;
