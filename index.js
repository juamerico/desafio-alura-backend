const express = require("express")
const app = express()

app.use(express.json())

const categoryRouter = require("./controllers/categorias")
const InvalidData = require("./models/errors/InvalidData")
const MissingData = require("./models/errors/MissingData")
const NotFound = require("./models/errors/NotFound")

app.use("/api/categorias", categoryRouter)

app.use((err, req, res, next) => {
    let status = 404

    if(err instanceof InvalidData || err instanceof MissingData) {
        status = 400
    }

    if(err instanceof NotFound) {
        status = 404
    }

    res.status(status)
    res.send(JSON.stringify({error: err.message}))
    console.log(err.message)
})

const port = 4000
app.listen(port, () => console.log(`Rodando na porta http://localhost:${port}`))
