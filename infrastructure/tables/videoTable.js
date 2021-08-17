const Sequelize = require("sequelize")
const instance = require("../dbConnection")

const columns = {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Campo título não pode estar vazio"
            }
        }
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "categoria",
            key: "id"
        }
    }
}

const settings = {
    freezeTableName: true,
    tableName: "video",
    timeStamps: true,
}

module.exports = instance.define("video", columns, settings)
