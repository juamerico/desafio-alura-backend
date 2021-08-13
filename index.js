const express = require("express")
const app = express()

app.use(express.json())

const categoryRouter = require("./controllers/categorias")
const InvalidData = require("./models/errors/InvalidData")
const MissingData = require("./models/errors/MissingData")
const NotFound = require("./models/errors/CategoryNotFound")
const Video = require("./models/videos")

//Busca vídeo por título (query params)
app.get("/videos", async (req, res, next) => {
    try {
        const video = new Video(
            {
                titulo: req.query.search
            }
        )
        const foundVideos = await video.loadQuery()
        res.status(200)
        res.send(
            JSON.stringify(foundVideos)
        )
        
    } catch(err) {
        next(err)
    }
})

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

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Rodando na porta http://localhost:${port}`))
