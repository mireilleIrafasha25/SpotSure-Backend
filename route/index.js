
import userRoute from "./userRoute.js";
import contactRoute from "./contactRoute.js"
import express from "express";
import ParkingRoute from "./ParkingRoute.js";
import BookingRoute from "./BookingRoute.js"
import PaymentRoute from "./paymentRoute.js"
const route = express.Router();
route.use("/user", userRoute);
route.use("/contact", contactRoute);
route.use("/parking",ParkingRoute)
route.use("/booking",BookingRoute)
route.use("/payment",PaymentRoute)
export default route;