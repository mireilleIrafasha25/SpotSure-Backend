import { BadRequestError } from "../error/BadRequestError.js";
import BookingModel from "../model/BookingModel.js";
import ParkingModel from "../model/ParkingModel.js";
import UserModel from "../model/userModel.js";
import mongoose from "mongoose";
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
            res.status(404).json({message:"Parking lot not found"});
        }
    
    
        const totalPrice = parkingLot.pricePerHour * bookingDuration;

        const newBooking = new BookingModel({
            bookingDuration,
            totalPrice,
            plateNumber,
            user: userId, 
            username: user.Name, 
            parkingLot: parkingid,
            ParkingName:parkingLot.name,
        });

        
        const savedBooking = await newBooking.save();

       
        res.status(201).json({
            message: `You have booked at ${parkingLot.name} for ${bookingDuration} hours.`,
            data: savedBooking
        });

    } catch (error) {
        console.error("Error while creating booking:", error);
        next(new BadRequestError("Failed to create booking"));
    }
};
export const getBookingById=async(req,res,next)=>
{

    const {id}=req.params;
    try{
    const foundBooking=await BookingModel.findById(id);
    if(!foundBooking)
    {
        res.status(404).json("Booking not found")
    }
    return  res.status(200).json({
        data:foundBooking
    })}
    catch(error){
     return res.status(500).json({error: error.message});
    }
}
export const getBookingbyUser=async(req,res)=>{
  const user=req.params.user;
  const foundUserBooking= await BookingModel.findOne({user});
  if(!foundUserBooking)
  {
    res.status(404).json({
        message:"User ID not found"
    })
  }
  res.status(200).json(
    {
        message:"Booking by User retrieved successfully",
        data:foundUserBooking
    }
  )

}
export const ListBookings = async(req, res, next)=>
{
    try{
    const allBookings=await BookingModel.find();
    return  res.status(200).json({
        size:allBookings.length,
        data:allBookings
    })}
    catch(error){
     return res.status(500).json({error: error.message});
    }
}

export const getTodayBookings = async (req, res, next) => {
    try {
        // Get today's date in YYYY-MM-DD format
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Get bookings where the date matches today
        const todayBookings = await BookingModel.find({
            bookingDate: { $gte: today }
        }).populate('user', 'Name').populate('parkingLot', 'name pricePerHour');

        return res.status(200).json({
            size: todayBookings.length,
            data: todayBookings
        });
    } catch (error) {
        console.error("Error fetching today's bookings:", error);
        return res.status(500).json({ error: "Failed to fetch today's bookings" });
    }
}

export const getTodayBookingsForParking = async (req, res) => {
  try {
    let { parkingLotId } = req.query; // Get parking ID from query parameters

    if (!parkingLotId) {
      return res.status(400).json({ message: "ParkingLot ID is required" });
    }

    parkingLotId = parkingLotId.trim(); // Remove any extra spaces or newlines

    // Check if parkingLotId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(parkingLotId)) {
      return res.status(400).json({ message: "Invalid ParkingLot ID" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of the day

    const tomorrow = new Date();
    tomorrow.setHours(23, 59, 59, 999); // End of the day

    const bookings = await BookingModel.find({
      parkingLot: new mongoose.Types.ObjectId(parkingLotId), // Convert to ObjectId
      bookingDate: { $gte: today, $lt: tomorrow }, // Filter bookings for today
      status: "pending", // Only show confirmed bookings
    })
      .populate("user", "Name")
      .populate("parkingLot", "name");

    res.status(200).json({ size: bookings.length, data: bookings });
  } catch (error) {
    console.error("Error fetching today's bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
};