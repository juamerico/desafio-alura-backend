const Sequelize = require("sequelize")
const instance = require("../dbConnection")

const columns = {
    categoria: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cor: {
        type: Sequelize.STRING,
        allowNull: false
    }
}

const settings = {
    freezeTableName: true,
    tableName: "categoria",
    timeStamps: true,
}

module.exports = instance.define("categoria", columns, settings)
