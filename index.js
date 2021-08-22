const express = require("express")
const app = express()

//Express
app.use(express.json())

const categoryRouter = require("./controllers/categorias")
const InvalidData = require("./models/errors/InvalidData")
const MissingData = require("./models/errors/MissingData")
const NotFound = require("./models/errors/CategoryNotFound")
const CategoryNotFound = require("./models/errors/CategoryNotFound")
const VideoNotFound = require("./models/errors/VideoNotFound")
const Table = require("./infrastructure/tables/videoTable")

//Busca vídeo por título (query params)
app.get("/api/videos", async (req, res, next) => {
    try {
        if(Object.keys(req.query).length < 1) {
            throw new MissingData("título")
        } else {
            const video = await Table.findAll({
                where: {titulo: req.query.search}
            })
            if(video.length > 0) {
                res.status(200)
                res.json(video)
            } else {
                throw new VideoNotFound(req.query.search)
            }
        }
        
    } catch(err) {
        next(err)
    }
})

//Roteador categorias
app.use("/api/categorias", categoryRouter)

//Manipulação de erros
app.use((err, req, res, next) => {
    let status = 404

    if(err instanceof InvalidData || err instanceof MissingData) {
        status = 400
    }

    if(err instanceof NotFound || err instanceof CategoryNotFound || err instanceof VideoNotFound) {
        status = 404
    }

    res.status(status)
    res.json({error: err.message})
    console.log(err.message)
})

//Server
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Rodando na porta http://localhost:${port}`))
