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

        const port = 4000
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`)
        })
    }
})