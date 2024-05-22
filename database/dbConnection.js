import mysql from 'mysql2'


// export const dbConnection = ()=>{

    export const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'shopping',
    });
    
    connection.connect((err)=>{
        if(err) return console.log("error connecting to database");
        console.log("connection to database is successful");
    })
    // ex connection
// }