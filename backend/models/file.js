import mongoose from "mongoose";

const fileSchema= new mongoose.Schema({
   
    email:{
        type:String,
        required:true
        
    },
    file:{
        type:String,
        required:true
    },
    approved:{
        type:String,
        enum:["approved","not approved"],
        default:"not approved"

    },
   
},{timestamps:true})

const FileModel= mongoose.model('file',fileSchema)

export default FileModel