import express from "express";
import { getStudent, updateStudent,deleteStudent,createStudent } from "../controller/studentdetailsController.js";
import requireAuth from '../middleware/requireAuth.js'
const router = express.Router();
//require auth for all operations
router.use(requireAuth);
router.get("/", getStudent);

router.get("/:id", (req, res) => {
  res.json({ Msg: "get single workouts" });
});

// router.post("/", (req, res) => {
//   res.json({ msg: "Post a new workout" });
// });
router.post("/", createStudent);
router.delete("/:id",deleteStudent);
router.patch("/:id", updateStudent);
export default router;
