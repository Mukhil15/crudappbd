import User from '../models/Users_Model.js'
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"
import validator from "validator";
const createToken=(_id)=>{
    return jwt.sign({_id},process.env.Secret,{expiresIn:'1d'});
}

//login user
export async function loginUser(req,res){
   const {email,password}=req.body;
   try{
    const user=await User.findOne({email});
    if(!user) return res.status(404).json({message:'User not found'});
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(400).json({message:'Invalid password'});
    const token=createToken(user._id);
    res.json({email,token})
   }catch(error){
    res.status(400).json({error:error.message})
   }
}
//signup user
export async function signupUser(req,res){
    const { email, password } = req.body;

  try {
    if (!email || !password) {
        throw new Error('Please provide both email and password');
      }
  
      else if (!validator.isEmail(email)) {
        throw new Error('Invalid email');
      }
     //here we customized the conditon
      else if (!validator.isStrongPassword(password, {
        minLength: 5, 
        minLowercase: 1, 
        minUppercase: 1, 
        minNumbers: 1, 
        minSymbols: 0
      })) {
        throw new Error('Your password is Weak, Provide a Strong password');
      }
  
      // Check if user exists
      const exists = await User.findOne({ email });
      if (exists) {
        throw new Error('Email already exists');
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
  
      // Create user
      const user = await User.create({ email, password: hash });
  
      // Create token
      const token = createToken(user._id);
  
      res.status(200).json({ email, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}



//validator.isStrongPassword default conditions:
/*
Default Conditions:
Length: At least 8 characters long.
Lowercase: Contains at least 1 lowercase letter (a-z).
Uppercase: Contains at least 1 uppercase letter (A-Z).
Numbers: Contains at least 1 number (0-9).
Symbols: Contains at least 1 special character (e.g., !@#$%^&*).
*/

//we can also customize it,