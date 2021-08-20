require("dotenv").config()
const Sequelize = require("sequelize")

const instance = new Sequelize(
    process.env.JAWS_DATABASE,
    process.env.JAWS_USER,
    process.env.JAWS_PASS,
    {
        host: process.env.JAWS_HOST,
        dialect: "mysql"
    }
)

module.exports = instance
