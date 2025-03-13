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
  username: {
    type: String, // Tubika izina ry'umukoresha
    required: true,
},
  plateNumber:{
    type: String,
    required: true
  },
  bookingDate: {
    type: Date,
    default:Date.now,
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
  },
  PaymentStatus:{
    type: String,
    enum: ['paid', 'unpaid'],
    default: 'paid'
  }
}, {
  timestamps: true
});

const BookingModel = mongoose.model('Booking', bookingSchema);
export default BookingModel
