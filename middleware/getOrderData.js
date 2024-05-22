import { connection } from "../database/dbConnection.js";


export async function getOrderData(req, res, next) {
    const { order_items } = req.body;

    if (!order_items || !Array.isArray(order_items) || order_items.length === 0) {
        return res.status(400).json({ error: 'Order items are required' });
    }

    let totalAmount = 0;
    let itemsProcessed = 0;
    let updatedOrderItems = [];

    for (let item of order_items) {

        connection.execute(`SELECT unit_price FROM products WHERE id = '${item.productid}'`, (err, product) => {

            if (!product || product.length === 0) {
                return res.status(404).json({ error: `Product with id ${item.productid} not found` });
            }

            const unitPrice = product[0].unit_price;
            const itemTotal = unitPrice * item.quantity;
            totalAmount += itemTotal;
            console.log("total in loop" + totalAmount);

            updatedOrderItems.push({ ...item, unit_price: unitPrice });

            itemsProcessed++;

            if (itemsProcessed === order_items.length) {
                req.body.order_items = updatedOrderItems;
                req.body.total_amount = totalAmount;
                next();
            }
        })
    }
}