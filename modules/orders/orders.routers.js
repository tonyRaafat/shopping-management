import { Router } from "express";
import { addOrder, atleastFiveOrder, averageValue, earliestOrder, mostItems, noOrder, orderpercentge, spentMostMoney } from "./orders.controllers.js";
import { getOrderData } from "../../middleware/getOrderData.js";

const router = Router()

router.post('/',getOrderData,addOrder)

router.get('/average-value',averageValue)
router.get('/no-order',noOrder)
router.get('/customer-purchased-most-items',mostItems)
router.get('/customers-spent-most-money',spentMostMoney)
router.get('/customers-atleast-five-orders',atleastFiveOrder)
router.get('/customers-made-orders-percentage',orderpercentge)
router.get('/customers-with-earliest-orders',earliestOrder)




export default router