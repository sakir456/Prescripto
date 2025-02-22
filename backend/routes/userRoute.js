import express from "express";
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment,paymentRazorpay, verifyRazorpay,  generateSummary,  submitReport, doctorRecommander } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/update-profile",upload.single("image"),authUser, updateProfile)
userRouter.get("/get-profile",authUser, getProfile)
userRouter.post("/update-profile",upload.single("image"),authUser, updateProfile)
userRouter.post("/book-appointment",authUser,bookAppointment)
userRouter.get("/appointments",authUser,listAppointment)
userRouter.post("/cancel-appointment",authUser,cancelAppointment)
userRouter.post("/payment-razorpay",authUser,paymentRazorpay)
userRouter.post("/verifyRazorpay",authUser,verifyRazorpay)
userRouter.post("/generate-summary",upload.single("image"),authUser, generateSummary)
userRouter.post("/submit-report",upload.single("image"), authUser, submitReport)
userRouter.post("/doctor-recommander", authUser, doctorRecommander)



export default userRouter