import express from "express";
import { createBooking } from "../controller/Bookingcontroller.js";
import {authorize,authenticateToken} from "../middleware/authethicateToken.js"

const router = express.Router();

router.post("/newBooking", authenticateToken,authorize("carOwner"),createBooking);

export default router;
