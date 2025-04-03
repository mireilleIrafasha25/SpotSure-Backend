
import express from "express";
import {GetAllPayment,FakePayment} from "../controller/fakePayment.js"
import {authenticateToken,authorize} from "../middleware/authethicateToken.js"
const router = express.Router();
router.get("/getAllPayment",authenticateToken,authorize('parkingOwner'), GetAllPayment);
router.post("/fakePayment",authenticateToken,authorize('carOwner'),FakePayment);
export default router;