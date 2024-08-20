import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  user_id:{
    type:String,
    required:true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  scholarStatus: {
    type: String,
    required: true,
    enum: ["dayscholar", "hostel"],
  },
  dob: {
    type: Date,
    required: true,
  },
  registrationTime: {
    type: String,
    required: true,
  },
  favoriteFood: {
    type: String,
    required: true,
    enum: ["veg", "non-veg"],
  },
});

const StudentModel = mongoose.model("Studentdetails", studentSchema);

export default StudentModel;
