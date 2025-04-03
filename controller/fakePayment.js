// Backend - Fake Payment API with ES Module (ESM), Node.js, Express.js, and CORS
import { v4 as uuidv4 } from "uuid";
import UserModel from "../model/userModel.js"
import ParkingModel from "../model/ParkingModel.js";
import FakeModel from "../model/fakePaymentModel.js";
let payments = []; // Fake Database

// Fake Payment Endpoint
export const FakePayment=async (req, res) => {
    const userId = req.user.id;
    const { amount,parkingid } = req.body;
    const user= await UserModel.findById(userId)
    if(!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const parkingLot = await ParkingModel.findById(parkingid);
    if(!parkingLot){
        return res.status(404).json({ message: "Parking lot not found" });
    }
    if (!amount) {
        return res.status(400).json({ message: "amount are required" });
    }
    
    const fakeTransaction = new FakeModel(
       { id: uuidv4(),
        amount,
        parkingName:parkingLot.name,
        userName:user.Name,
        status: "success",
        date: new Date().toISOString()
       }
    )
    const savedTransaction=await fakeTransaction.save();
    return res.json({ message: "Payment successful", 
        transaction: savedTransaction });
};

// Get all fake payments
export const GetAllPayment=async(req, res) => {
    res.json(payments);
};

