import { Router } from "express";
import { signin, signup } from "./customers.controllers.js";
import { checkEmailExist } from "../../middleware/checkEmailExist.js";

const router = Router()

router.post('/signup',checkEmailExist,signup)
router.get('/signin',signin)



export default router