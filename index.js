const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")

const categoryRouter = require("./controllers/categorias")
const userRouter = require("./controllers/usuario")
const {MissingData, CategoryNotFound, VideoNotFound, InvalidData, InvalidPassword} = require("./models/errors")
const Table = require("./infrastructure/tables/videoTable")

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set("view engine", "ejs")
app.use("/public", express.static("public"))

app.use((req, res, next) => {
    next()
})

//Busca vídeo por título (query params)
app.get("/api/videos", authenticateToken, async (req, res, next) => {
    try {
        if(Object.keys(req.query).length < 1) {
            throw new MissingData("título")
        } else if(req.query.search === "all") {
            const video = await Table.findAll()
            if(video.length > 0) {
                res.status(200)
                res.json(video)
            } else {
                throw new VideoNotFound(req.query.search)
            }
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

//Roteadores
app.use("/api/categorias", categoryRouter)
app.use("/usuarios", userRouter)

//Manipulação de erros
app.use((err, req, res, next) => {
    let status = 404

    if(err instanceof InvalidData || err instanceof MissingData || err instanceof InvalidPassword) {
        status = 400
    }

    if(err instanceof CategoryNotFound || err instanceof VideoNotFound) {
        status = 404
    }

    res.status(status)
    res.json({error: err.message})
    console.log(err.message)
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if(token == null) res.status(403).redirect("/usuarios/login")

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if(err) res.status(400).redirect("/usuarios/login")
        req.user = user
        next()
    })
}

//Server
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Rodando na porta http://localhost:${port}`))
