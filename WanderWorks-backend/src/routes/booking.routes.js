// routes/booking.routes.js
import express from "express";
import {
  getAllBookings,
  getBookingById,
  getBookingsByUserId,
  createBooking,
  updateBooking,
  deleteBooking
} from "../controllers/booking.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();
router.get("/user/:userId",getBookingsByUserId);
router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.post("/",createBooking);
router.put("/:id", updateBooking);
router.delete("/:id", authenticateToken, deleteBooking);

export default router;
