const Sequelize = require("sequelize")
const instance = require("../dbConnection")

const columns = {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    }
}

const settings = {
    freezeTableName: true,
    tableName: "videos",
    timeStamps: true,
    references: {
        model: require("./categoryTable"),
        key: "id"
    }
}

module.exports = instance.define("videos", columns, settings)
