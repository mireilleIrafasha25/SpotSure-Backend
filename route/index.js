
import userRoute from "./userRoute.js";
import contactRoute from "./contactRoute.js"
import express from "express";
import ParkingRoute from "./ParkingRoute.js"
const route = express.Router();
route.use("/user", userRoute);
route.use("/contact", contactRoute);
route.use("/parking",ParkingRoute)
export default route;