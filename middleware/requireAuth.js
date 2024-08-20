import jwt from 'jsonwebtoken';
import User from "../models/Users_Model.js"

const requireAuth=async(req,res,next)=>{
    //verify authentication
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).send({error:'Unauthorized'});
    }
    const token = authorization.split(' ')[1];
    
    //verify token
    try{
        const {_id}=jwt.verify(token,process.env.SECRET)
        req.user=await User.findOne({_id}).select('_id');
        next()
    }catch(error){
        console.log(error)
        res.status(401).json({error:'Request is not authorized'})
    }
    
        
}
export default requireAuth