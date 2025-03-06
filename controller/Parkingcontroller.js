import ParkingModel from "../model/ParkingModel.js";
import { BadRequestError } from "../error/BadRequestError.js";
import { NotFoundError } from "../error/notfoundError.js";

// Create a new parking lot
export const createParkingLot = async (req, res, next) => {
  try {
    const { name, nameofBuilding, location, numberOfSpaces, availableSpaces, parkingSizes, nearbyBuildings, images, pricePerHour } = req.body;

    const newParkingLot = new ParkingModel({
      name,
      nameofBuilding,
      location,
      numberOfSpaces,
      availableSpaces,
      parkingSizes,
      nearbyBuildings,
      images,
      pricePerHour
    });

    const savedParkingLot = await newParkingLot.save();
    res.status(201).json({ message: "Parking lot created successfully", data: savedParkingLot });
  } catch (error) {
    next(new BadRequestError("Failed to create parking lot"));
  }
};



// Find parking lots near a building
export const findParkingNearBuilding = async (req, res, next) => {
  try {
    const { buildingName } = req.params;

    // Find parking lots that mention the building in their nearby buildings
    const parkingLots = await ParkingModel.find({ nearbyBuildings: { $in: [buildingName] } });

    if (parkingLots.length === 0) {
      return next(new NotFoundError("No parking found near this building"));
    }

    res.status(200).json(parkingLots);
  } catch (error) {
    next(new NotFoundError("Error finding parking lots"));
  }
};

