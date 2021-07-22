const customExpress = require("./config/customExpress")
const connection = require("./infrastructure/connection")
const Tables = require("./infrastructure/tables")

connection.connect(erro => {
    if(erro) {
        console.log(erro)
    } else {
        console.log("Conectado")

        Tables.init(connection)

        const app = customExpress()

        const port = 4000
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`)
        })
    }
})