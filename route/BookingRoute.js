import express from "express";
import { createBooking } from "../controller/Bookingcontroller.js";

const router = express.Router();

router.post("/book", createBooking);

export default router;
