import express from 'express'
import customerRouter from './modules/customers/customers.routers.js'
import productsRouter from './modules/products/products.routers.js'
import orderRouter from './modules/orders/orders.routers.js'
const app = express()
const port = 3000


app.use(express.json())

app.use('/customers',customerRouter)
app.use('/products',productsRouter)
app.use('/orders',orderRouter)
app.get('/', (req, res) => res.send('Hello World!'))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))