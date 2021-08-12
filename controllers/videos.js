//A rota padrão é '/api/categorias/:idCategoria/videos/'

const router = require("express").Router({mergeParams: true})
const Table = require("../infrastructure/tables/videoTable")
const Video = require("../models/videos")

//Criar novo vídeo a partir da #categoria
router.post("/", async (req, res, next) => {
    try {
        const video = new Video(
            Object.assign(
                {},
                req.body,
                {categoria_id: req.categoria.id}
            )
        )
        await video.create()
        res.status(201)
        res.send(
            JSON.stringify(video)
        )

    } catch(err) {
        next(err)
    }
})

//Exibir vídeos por categoria
router.get("/", async (req, res, next) => {
    try{
        const videos = await Table.findAll(
            {
                where: {categoria_id: req.categoria.id},
                raw: true
            }
        )
        res.status(200)
        res.send(
            JSON.stringify(videos)
        )

    } catch(err) {
        next(err)
    }
})

//Exibir vídeo por id
router.get("/:idVideo", async (req, res, next) => {
    try {
        const video = new Video({
            id: req.params.idVideo,
            categoria_id: req.categoria.id
        })
        await video.findOne()
        res.status(200)
        res.send(
            JSON.stringify(video)
        )
        
    } catch(err) {
        next(err)
    }
})

//Atualizar vídeo por #id
router.patch("/:idVideo", async (req, res, next) => {
    try {
        const video = new Video(
            Object.assign(
                {},
                {id: req.params.idVideo},
                {categoria_id: req.categoria.id},
                req.body
            ))
        const newVideo = await video.update()
        res.status(200)
        res.send(
            JSON.stringify(newVideo)
        )
    
    } catch(err) {
        next(err)
    }
})

module.exports = router
