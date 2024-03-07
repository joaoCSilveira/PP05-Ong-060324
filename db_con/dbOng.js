const mysql = require("mysql2/promise")

const dbOng = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "kj.sim2!220",
    database: "ong"
})

module.exports = dbOng