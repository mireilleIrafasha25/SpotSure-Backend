import ParkingModel from "../model/ParkingModel.js";
import BookingModel from "../model/BookingModel.js";
import { BadRequestError } from "../error/BadRequestError.js";
import { NotFoundError } from "../error/notfoundError.js";

export const createParkingLot = async (req, res, next) => {
    try {
      const newParkingLot = new ParkingModel(req.body);
      const savedParkingLot = await newParkingLot.save();
      res.status(201).json({ message: "Parking lot created successfully", data: savedParkingLot });
    } catch (error) {
      console.error("Error while creating parking lot:", error);
      res.status(400).json({ message: "Failed to create parking lot", error: error.message });
    }
  };
  



// Find parking lots near a building
export const findParkingNearBuilding = async (req, res, next) => {
    try {
      const { destinationName } = req.body;
  
      if (!destinationName) {
        return next(new BadRequestError("Destination name is required"));
      }
  
      // Find parking lots that have the given building name in their nearbyBuildings array
      const parkingLots = await ParkingModel.find({ nearbyBuildings: { $in: [destinationName] } });
  
      if (!parkingLots || parkingLots.length === 0) {
        return next(new NotFoundError("No parking found near this building"));
      }
  
      res.status(200).json({
        message: "Parking lots found",
        data: parkingLots,
      });
    } catch (error) {
      console.error("Error while finding parking:", error);
      next(new BadRequestError("Error finding parking lots"));
    }
  };
  

