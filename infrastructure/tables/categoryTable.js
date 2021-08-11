const Sequelize = require("sequelize")
const instance = require("../dbConnection")

const columns = {
    titulo: {
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
    tableName: "categorias",
    timeStamps: true,
}

module.exports = instance.define("categorias", columns, settings)
