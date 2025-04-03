import mongoose from 'mongoose'
const schema=mongoose.Schema;

const FakeSchema=new schema(
    {
  amount:{
    type:Number,
    required:true,
    },
    parkingName:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
    },
    status: {
        type: String,
        enum: ['success', 'failed'],
        default: 'success',
    },
    date:{
        type: Date,
        default: Date.now,
    }
  },
 {
    timestamps: true, // automatically adds createdAt and updatedAt fields
 }
    
)

const FakeModel=mongoose.model('FakePayment',FakeSchema);

export default FakeModel;