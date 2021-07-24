const customExpress = require("./config/customExpress")
const db = require("./infrastructure/dbConnection")
const Tables = require("./infrastructure/tables")

db.connect(erro => {
    if(erro) {
        console.log(erro)
    } else {
        console.log("Conectado")

        Tables.init(db)

        const app = customExpress()

        app.listen(process.env.PORT || 4000, () => console.log("rodando"))
    }
})