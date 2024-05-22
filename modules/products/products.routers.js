import { Router } from "express";
import { addProduct, totalRevenue, numberItemsSold} from "./products.controllers.js";

const router = Router()

router.post('/',addProduct)
router.get('/revenue',totalRevenue)
router.get('/number-items-sold',numberItemsSold)




export default router