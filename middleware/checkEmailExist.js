import { connection } from "../database/dbConnection.js";


export function checkEmailExist(req,res,next){
    connection.execute(`select email from customers where email = '${req.body.email}'`, (err, data) => {
        if (data.length != 0) {
            return res.status(400).json({ error: 'customer already exist' })
        }
        next()
    })
}