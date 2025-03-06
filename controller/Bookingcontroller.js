import BookingModel from "../model/BookingModel.js";
import ParkingModel from "../model/ParkingModel.js";
import { BadRequestError, NotFoundError } from "../errors"; 

// Create a new booking
export const createBooking = async (req, res, next) => {
  try {
    const { user, parkingLot, parkingSpotId, bookingDate, bookingDuration } = req.body;
    const parking = await ParkingModel.findById(parkingLot);
    
    if (!parking) {
      return next(new NotFoundError("Parking lot not found"));
    }

    // Check if parking is available
    if (parking.availableSpaces <= 0) {
      return next(new BadRequestError("No available spaces for the selected parking spot"));
    }

    const totalPrice = parking.pricePerHour * bookingDuration;

    const newBooking = new BookingModel({
      user,
      parkingLot,
      parkingSpotId,
      bookingDate,
      bookingDuration,
      totalPrice,
      status: 'pending'
    });

    parking.availableSpaces -= 1;  // Decrease available space count
    await parking.save();

    const savedBooking = await newBooking.save();
    res.status(201).json({ message: "Booking created successfully", data: savedBooking });
  } catch (error) {
    next(new BadRequestError("Failed to create booking"));
  }
};
