const Sequelize = require("sequelize")
const instance = require("../dbConnection")

const columns = {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}

const settings = {
    freezeTableName: true,
    tableName: "usuario",
    timeStamps: true,
}

module.exports = instance.define("usuario", columns, settings)
