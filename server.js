import express from "express";
import studentdetailsRoute from "./routes/studentdetailsRoute.js";
import users from "./routes/usersRoute.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
const app = express();

//middleware
app.use(express.json());
app.use(cors({
  origin:["https://crudappfront.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials:true
}));

mongoose.connect(process.env.MongodbURL);
// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });
app.use("/api/user",users);
app.use("/api/studentdetailsRoute", studentdetailsRoute);
// // app.get('/',(req,res)=>{
// //     res.json({Msg:"Helooo"})
// // })
// app.get("/getUsers", (req, res) => {
//   UserModel.find()
//     .then((users) => res.json(users))
//     .catch((err) => res.json(err));
// });

app.use("/", (req, res) => {
  res.json({ error: "Error in server" });
});
app.listen(process.env.PORT, () => {
  console.log("listening on the port", process.env.PORT);
});
