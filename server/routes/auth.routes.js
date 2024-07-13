import express from "express"
import { login, logout, signUp } from "../controllers/auth.contoller.js";
const router=express.Router();

router.post('/login',login)

router.post('/signup',signUp)

router.post('/logout',logout)


export default router;