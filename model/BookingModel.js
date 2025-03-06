import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',  // Reference to User Model for the one who made the booking
    required: true 
  },
  parkingLot: { 
    type: Schema.Types.ObjectId, 
    ref: 'ParkingLot', // Reference to the Parking Lot booked
    required: true 
  },
  parkingSpotId: { 
    type: String, 
    required: true // This will store the spot number or unique identifier
  },
  bookingDate: {
    type: Date,
    required: true
  },
  bookingDuration: {
    type: Number, // Duration in hours
    required: true
  },
  totalPrice: {
    type: Number, // Total price based on parking rate and duration
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

const BookingModel = mongoose.model('Booking', bookingSchema);
export default BookingModel
