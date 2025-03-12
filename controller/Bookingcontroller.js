import { NotFoundError } from "../error/notfoundError.js";
import ParkingModel from "../model/ParkingModel.js";
import { BadRequestError } from "../error/BadRequestError.js";
import BookingModel from "../model/BookingModel.js";
export const createBooking = async (req, res, next) => {
    try {
      const { userId, parkingLotId, parkingSpotId, bookingDate, bookingDuration } = req.body;
  
      // Check if all required fields are provided
      if (!userId || !parkingLotId || !parkingSpotId || !bookingDate || !bookingDuration) {
        return next(new BadRequestError("All fields are required"));
      }
  
      // Find the selected parking lot
      const parkingLot = await ParkingModel.findById(parkingLotId);
      if (!parkingLot) {
        return next(new NotFoundError("Parking lot not found"));
      }
  
      // Calculate total price based on duration
      const totalPrice = parkingLot.pricePerHour * bookingDuration;
  
      // Create the booking
      const newBooking = new BookingModel({
        user: userId,
        parkingLot: parkingLotId,
        parkingSpotId,
        bookingDate,
        bookingDuration,
        totalPrice,
      });
  
      const savedBooking = await newBooking.save();
  
      res.status(201).json({ 
        message: "Booking created successfully", 
        data: savedBooking 
      });
  
    } catch (error) {
      console.error("Error while creating booking:", error);
      next(new BadRequestError("Failed to create booking"));
    }
  };
  