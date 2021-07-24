const mysql = require("mysql")

const connection = mysql.createConnection({
    host: "us-cdbr-east-04.cleardb.com",
    port: 3306,
    user: "b28dba569e9a85",
    password: "2220acc7",
    database: "heroku_f13adb82a8f2201"
})

module.exports = connection

//mysql://b28dba569e9a85:2220acc7@us-cdbr-east-04.cleardb.com/heroku_f13adb82a8f2201?reconnect=true