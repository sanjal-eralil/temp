import FileModel from "../models/file.js";

const store=async(req,res,next)=>{
    let data=new FileModel({
        email:req.body.email,
      
    })
    if(req.file){
        data.file=req.file.path
    }

    data.save()
    .then(response=>{
        res.json({
            message:'Successfull'
        })
    })
    .catch(error=>{
        res.json({
            error:error,
            message:'error'
            
        })
    })
}

export {store};



