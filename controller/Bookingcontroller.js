import { NotFoundError } from "../error/notfoundError.js";
import { BadRequestError } from "../error/BadRequestError.js";
import BookingModel from "../model/BookingModel.js";
import ParkingModel from "../model/ParkingModel.js";
import UserModel from "../model/userModel.js";

export const createBooking = async (req, res, next) => {
    try {
        const { bookingDuration, parkingid,plateNumber } = req.body;
        const userId = req.user.id; 

        
        const user = await UserModel.findById(userId);
        if (!user) {
            return next(new NotFoundError("User not found"));
        }

        
        const parkingLot = await ParkingModel.findById(parkingid);
        if (!parkingLot) {
            return next(new NotFoundError("Parking lot not found"));
        }

    
        const totalPrice = parkingLot.pricePerHour * bookingDuration;

        const newBooking = new BookingModel({
            bookingDuration,
            totalPrice,
            plateNumber,
            user: userId, 
            username: user.Name, 
            parkingLot: parkingid 
        });

        // 5. Bika booking muri database
        const savedBooking = await newBooking.save();

        // 6. Twohereze response
        res.status(201).json({
            message: `You have booked at ${parkingLot.name} for ${bookingDuration} hours.`,
            data: savedBooking
        });

    } catch (error) {
        console.error("Error while creating booking:", error);
        next(new BadRequestError("Failed to create booking"));
    }
};
