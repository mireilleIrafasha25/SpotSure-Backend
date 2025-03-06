import express from 'express';
import { createParkingLot, findParkingNearBuilding } from '../controller/Parkingcontroller.js';

const router = express.Router();
// Parking Routes
router.post('/create', createParkingLot);  // Register a new parking lot
router.post('/findNearBy', findParkingNearBuilding);  // Find parking lots near a specific building



export default router;
