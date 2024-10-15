
import UserModel from "../models/user.js"
import path from 'path';
import fs from 'fs'; 
import FileModel from "../models/file.js";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';


const Getuser=async(req,res)=>{
    try {
        const users=await UserModel.find()
         res.status(200).json({users})
    } catch (error) {
        res.status(500).json({message:"intenral server error"})
        console.log(error)
    }
}

const deletUser=async(req,res)=>{
    try {
        const userId=req.params.id
              const checkAdmin=await UserModel.findById(userId)

              if (checkAdmin.role =='admin') {
                return  res.status(409).json({message:"you can not delet youselfe"})
              }
        const user=await UserModel.findByIdAndDelete(userId)
        if (!user) {
          return  res.status(404).json({message:"user not found"})
        }
        res.status(200).json({message:"user delet successfully ",user})
    } catch (error) {
        res.status(500).json({message:"intenral server error"})
        console.log(error)
    }
}




const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const GetAllUsers = async (req, res) => {
  try {
    // Step 1: Retrieve all users from the database
    const users = await FileModel.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    // Step 2: Loop through users and add a flag to indicate if their file exists
    const usersWithFileStatus = users.map(user => {
      const filePath = user.file; 
      const absolutePath = filePath ? path.join(__dirname, '..','..', filePath) : null;
     console.log(absolutePath);
     console.log(filePath);
      // Check if the file exists
      console.log(fs.existsSync(absolutePath));
      console.log(fs.existsSync(filePath));
      const fileExists = absolutePath ? fs.existsSync(filePath) : false;
  
      return {
        email: user.email,       // Include the email
        approved: user.approved, // Include the 'approved' string field
        fileExists,              // Add a field to indicate if the file exists
        filePath: fileExists ? `/file/${path.basename(filePath)}` : null, // Provide the relative path to access the file if it exists
      };
    });

    // Step 3: Send the users' data
    res.status(200).json(usersWithFileStatus);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.error(error);
  }
};









export {Getuser,deletUser,GetAllUsers}