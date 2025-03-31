import express from "express";
import { register, login, logout, sendverifyotp, verifyingEmail,isAuthenticated,sendResetpassword,resetpassword,loginRequestOTP,verifyLoginOTP } from "../controller/auth_controller.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.post('/send-verify-otp',userAuth,sendverifyotp);
router.post('/verify-Account',userAuth,verifyingEmail);
router.get('/is-auth',userAuth,isAuthenticated)
router.post('/send-reset-otp',sendResetpassword)
router.post('/reset-password',resetpassword)
router.post('/login-request-otp', loginRequestOTP);
router.post('/verify-login-otp', verifyLoginOTP);

export default router