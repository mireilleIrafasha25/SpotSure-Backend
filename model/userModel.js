import mongoose from "mongoose";
const schema=mongoose.Schema

const userSchema=new schema({
    Name:{
        type:String,
        required:false,
            message:["Please enter your Name"]},
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:false
    },
    role:{
        
        enum:{
            values:["carOwner", "parkingOwner","admin"],
            message:'Role must be carOwner or parkingOwner.'
        },
        type:String,
        default: "carOwner"
    },
    otp:{
        type:Number,
        required:true
    },
    otpExpires:{
        type:Date,
        required:false
    },
    verified:{
        type:Boolean,
        required:true,
        default:false
    }
});
userSchema.pre("save", async function (next) {
    if (this.role === "admin" && this.isNew) {  // ✅ Only check when creating a NEW admin
        const existingAdmin = await mongoose.model("User").findOne({ role: "admin" });
        if (existingAdmin) {
            const error = new Error("An admin already exists. You cannot create another one.");
            return next(error);
        }
    }
    next();
});

const UserModel=mongoose.model("User",userSchema);

export default UserModel;