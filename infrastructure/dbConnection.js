const mysql = require("mysql")

const connection = mysql.createConnection({
    host: "kfgk8u2ogtoylkq9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "mwylsvcbcj026b7z",
    password: "r3fx1aihazlrdne4",
    database: "d8v6lfvxjgxnf7xj"
})

module.exports = connection

//ClearDB:
//mysql://b28dba569e9a85:2220acc7@us-cdbr-east-04.cleardb.com/heroku_f13adb82a8f2201?reconnect=true

//JAWSDb:
//mysql://mwylsvcbcj026b7z:r3fx1aihazlrdne4@kfgk8u2ogtoylkq9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/d8v6lfvxjgxnf7xj
