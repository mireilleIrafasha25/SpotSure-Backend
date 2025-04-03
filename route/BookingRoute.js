import express from "express";
import { createBooking,getBookingById,ListBookings,getTodayBookings,getTodayBookingsForParking,getBookingbyUser} from "../controller/Bookingcontroller.js";
import {authorize,authenticateToken} from "../middleware/authethicateToken.js"

const router = express.Router();
router.post("/newBooking", authenticateToken,authorize("carOwner"),createBooking);
router.get("/getBooking/:id",getBookingById)
router.get("/getBookingByUser/:user",authenticateToken,authorize('carOwner'),getBookingbyUser)
router.get("/listBooking",authenticateToken,authorize("parkingOwner"),ListBookings)
router.get("/todayBooking", authenticateToken, authorize("parkingOwner"),getTodayBookings)
router.get("/todayBookingsForParking", authenticateToken, authorize("parkingOwner"),getTodayBookingsForParking)
export default router;
