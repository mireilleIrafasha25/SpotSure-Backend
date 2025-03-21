import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv" 
dotenv.config()     
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_KEY , 
  api_secret: process.env.CLOUD_SECRET,
  timeout: 60000
});

export default cloudinary;