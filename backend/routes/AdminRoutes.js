import express from 'express'
import { Getuser, deletUser ,GetAllUsers} from '../controllers/Admin.js'
import { isAdmin } from '../middleware/verifyToken.js'
import { serveFileMiddleware } from '../middleware/Fileserver.js'



const AdminRoutes=express.Router()
 AdminRoutes.get('/getuser',isAdmin,Getuser)
 AdminRoutes.delete('/delet/:id',isAdmin,deletUser)
 AdminRoutes.get('/getall',GetAllUsers)
 AdminRoutes.get('/file/:filename', serveFileMiddleware);


export default AdminRoutes