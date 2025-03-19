import express from "express";
import { createBooking,getBookingById } from "../controller/Bookingcontroller.js";
import {authorize,authenticateToken} from "../middleware/authethicateToken.js"

const router = express.Router();

router.post("/newBooking", authenticateToken,authorize("carOwner"),createBooking);
router.get("/getBooking/:id",getBookingById)
export default router;
