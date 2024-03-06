const mysql = require("mysql2")

const dbOng = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "kj.sim2!220",
    database: "ong",
    multipleStatements: true, 
})

dbOng.connect(err => {

    if(err) {
        console.error("Error connecting to the database: " + err.stack)
        return
    }
    console.log("Connected to the database as id " + dbOng.threadId)
})

module.exports = dbOng