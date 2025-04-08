import mongoose from "mongoose";
const schema=mongoose.Schema;

const contactSchema = new schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    message1:{
        type:String,
        required:true,
    },
   phone:{
      type:String,
      required:true,  
    },
    subject:{
        type:String,
        required:true,
    }
});
const PortifolioContactModel=mongoose.model("PortifolioContact",contactSchema);

export default PortifolioContactModel;
