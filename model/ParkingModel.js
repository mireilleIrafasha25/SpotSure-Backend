import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const parkingLotSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  nameofBuilding: {
    type: String,
    required: true
  },
  location: {
   type: String, required: true 
  },
  numberOfSpaces: {
    type: Number,
    required: true
  },
  availableSpaces: {
    type: Number,
    required: true
  },
  parkingSizes: {type: Number, required: true }
  ,
  nearbyBuildings: [
    { type: String, required: true } // Array of building names
  ],
  image: { 
    url:{
    type: String, // Store the URL or file path of the image
    required: true
    }
  },
  pricePerHour: { 
    type: Number, 
    required: true 
  },
  bookings: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Booking'  // Reference to the Booking model
  }]
}, {
  timestamps: true
});

const ParkingModel = mongoose.model('ParkingLot', parkingLotSchema);
export default ParkingModel;
