import { MongooseError } from "mongoose";
import StudentModel from "../models/Studentdetails_Model.js";
import ClientError from "../error/ClientError.js";

export async function getStudent(req, res) {
  try {
    const user_id=req.user._id;
    const students = await StudentModel.find({user_id}).sort({createdAt:-1});
    res.json(students);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateStudent(req, res, next) {
  try {
    const id = req.params.id;
    const newData = req.body;
    const student = await StudentModel.findById(id);
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }
    Object.assign(student, newData);
    res.json(await student.save());
  } catch (error) {
    console.error("Error updating user:", error);
    if (error instanceof ClientError) {
      res.status(400).json({ message: error.message });
    } else if (error instanceof MongooseError) {
      res.status(500).json({ message: "Internal server error" });
    } else {
      next(error);
    }
  }
}

export async function deleteStudent(req, res, next) {
  try {
    const id = req.params.id;
    const deletedStudent = await StudentModel.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

export async function createStudent(req, res, next) {
  try {
    console.log("Request Body:", req.body);  // Log incoming data to ensure correctness

    const newStudent = new StudentModel({
      ...req.body,
      user_id: req.user._id,  // Assuming req.user_id is valid and passed from middleware
    });

    await newStudent.save();

    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
