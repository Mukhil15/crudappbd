import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
const userSchema=new mongoose.Schema({
email:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true,
}

});
const UserModel=mongoose.model("users",userSchema);
export default UserModel;

//if we need to make the sign up logics in models, then we can look dowm the code
// userSchema.statics.signup=async function(email,password){
//     if(!email || !password){
//         throw new Error('Please provide both email and password');
//     }
//     else if(!validator.isEmail(email)){
//         throw new Error('Invalid email');
//     }
//     //here we customized the conditon
//     else if(!validator.isStrongPassword(password,{minLength:5,minLowercase:1,minUppercase:1,minNumbers:1,minSymbols: 0})){
//         throw new Error('Your password is Weak, Provide a Strong password');
//     }
//     const exists=await this.findOne({email});
//     if(exists){
//         throw Error("Email already existed");
//     }
//     else{
//         const salt=await bcrypt.genSalt(10);
//         const hash=await bcrypt.hash(password,salt);
//         var user=await this.create({email,password:hash});
//     }
//     return user;
// }

// const UserModel=mongoose.model("users",userSchema);
// export default UserModel;

