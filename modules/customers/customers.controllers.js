import { connection } from "../../database/dbConnection.js";

const signup = (req, res, next) => {
        connection.query('INSERT INTO customers SET ?', req.body)
        res.status(201).json({ message: 'success' })
}

const signin = (req, res, next) => {
    connection.execute(`select * from customers where email = '${req.body.email}' and first_name = '${req.body["first_name"]}'`,(err,data)=>{
        if (data.length) {
            res.status(200).json({message:"login successful",data})
        }else{
            res.status(404).json({message:"wrong email or first name"})
        }
    })
}

export {
    signup,
    signin
}