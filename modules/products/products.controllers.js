import { connection } from "../../database/dbConnection.js";


export function addProduct(req, res, next) {
    const { product_name, category, unit_price } = req.body;
    const query = `INSERT INTO products (product_name, category, unit_price) VALUES (?, ?, ?)`;

    connection.query(query, [product_name, category, unit_price], (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Product added successfully', productId: data.insertId });
    });
}
export function totalRevenue(req, res, next) {
    const query = `
    SELECT category, SUM(order_items.unit_price * order_items.quantity) AS total_revenue
    FROM order_items
    JOIN products ON order_items.product_id = products.id
    GROUP BY category
`;

    connection.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
}

export function numberItemsSold(req,res,next){
    const query = `
        SELECT product_name, SUM(quantity) AS total_items_sold
        FROM order_items
        JOIN products ON order_items.product_id = products.id
        GROUP BY product_name
    `;

    connection.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
}