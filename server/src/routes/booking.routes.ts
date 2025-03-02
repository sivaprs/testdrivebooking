import express from "express";
import {
  createBooking,
  checkAvailability,
} from "../controllers/booking.controller";

const router = express.Router();

router.post("/", createBooking);
router.get("/", checkAvailability);

export default router;
