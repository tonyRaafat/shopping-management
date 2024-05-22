import { connection } from "../../database/dbConnection.js";

export function addOrder(req, res, next) {
    const { customer_id, order_items, total_amount } = req.body

    const orderQuery = `insert into orders (customer_id, total_amount) values (?, ?)`

    connection.query(orderQuery, [customer_id, total_amount], (err, result) => {
        if (err) return res.status(500).json({ error: err.message })

        const orderId = result.insertId
        const orderItemsQuery = `insert into order_items (order_id, product_id, quantity, unit_price) values ?`
        const orderItemsData = order_items.map(item => [orderId, item.productid, item.quantity, item.unit_price])

        connection.query(orderItemsQuery, [orderItemsData], (err, result) => {
            if (err) return res.status(500).json({ error: err.message })
            res.status(201).json({ message: 'Order created successfully', orderId })
        })
    })
}

export function averageValue(req, res, next) {
    const query = `select AVG(total_amount) as average_order_value from orders`

    connection.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.status(200).json(results[0])
    })
}

export function noOrder(req, res, next) {
    const query = `select * from customers where id not in (select DISTINCT customer_id from orders)`
    connection.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.status(200).json(results)
    })
}

export function mostItems(req, res, next) {
    const query = `
        select customers.*, sum(order_items.quantity) as total_items
        from customers
        join orders on customers.id = orders.customer_id
        join order_items on orders.id = order_items.order_id
        group by customers.id
        order by total_items desc
        limit 1
    `

    connection.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.status(200).json(results[0])
    })
}

export function spentMostMoney(req, res, next) {
    const query = `
        select customers.*, sum(orders.total_amount) as total_spent
        from customers
        join orders on customers.id = orders.customer_id
        group by customers.id
        order by total_spent desc
        limit 10
    `

    connection.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.status(200).json(results)
    })
}

export function atleastFiveOrder(req, res, next) {
    const query = `
    select customers.*
    from customers
    join orders on customers.id = orders.customer_id
    group by customers.id
    having count(orders.id) >= 5
`

    connection.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.status(200).json(results)
    })
}

export function orderpercentge(req, res, next) {
    const totalQuery = `select count(*) AS total_customers from customers`
    const multipleOrdersQuery = `
        select count(distinct customer_id) as multiple_order_customers
        from orders
        group by customer_id
        having count(id) > 1
    `

    connection.query(totalQuery, (err, totalResults) => {
        if (err) return res.status(500).json({ error: err.message })

        connection.query(multipleOrdersQuery, (err, multipleResults) => {
            if (err) return res.status(500).json({ error: err.message })

            const totalCustomers = totalResults[0].total_customers
            const multipleOrderCustomers = multipleResults.length
            const percentage = (multipleOrderCustomers / totalCustomers) * 100

            res.status(200).json({ percentage })
        })
    })
}

export function earliestOrder(req,res,next){
    const query = `
        select customers.*, orders.order_date
        from customers
        join orders on customers.id = orders.customer_id
        order by orders.order_date asc
        limit 1
    `

    connection.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.status(200).json(results[0])
    })
}