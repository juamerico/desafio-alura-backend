//A rota padrão é '/api/categorias/:idCategoria/videos/'

const router = require("express").Router({mergeParams: true})
const Table = require("../infrastructure/tables/videoTable")
const MissingData = require("../models/errors/MissingData")
const VideoNotFound = require("../models/errors/VideoNotFound")
const Video = require("../models/videos")

//Criar novo vídeo a partir da #idCategoria
router.post("/", async (req, res, next) => {
    try {
        if(Object.keys(req.body).length < 3) {
            throw new MissingData("")
        } else {
            const video = new Video(
                Object.assign(
                    {},
                    req.body,
                    {categoria_id: req.categoria.id}
                )
            )
            await video.create()
            res.status(201)
            res.json(video)
        }

    } catch(err) {
        next(err)
    }
})

//Exibir todos os vídeos da #idCategoria - com paginação
router.get("/", async (req, res, next) => {
    try {
        if(Object.keys(req.query).length === 0) {
            const videos = await Table.findAll({where: {categoria_id: req.categoria.id}, raw: true})
            if(videos.length < 1) {
                throw new VideoNotFound("")
            } else {
                res.status(200)
                res.send(
                    JSON.stringify(videos)
                )
            }
        } else {
            const videos = await Table.findAll({where: {categoria_id: req.categoria.id}, raw: true})
            if(videos.length < 1) {
                throw new VideoNotFound("")
            } else {
                const page = parseInt(req.query.page)
                const limit = 5
            
                const startIndex = (page - 1) * limit
                const endIndex = page * limit
            
                const results = {}
            
                if (endIndex < videos.length) {
                    results.next = {
                        page: page + 1
                    }
                }
            
                if(startIndex > 0) {
                    results.previous = {
                        page: page - 1
                    }
                }
            
                results.current = {page: page}
                results.results = videos.slice(startIndex, endIndex)
                
                res.json(results)
            }        
        }

    } catch(err) {
        next(err)
    }
})

//Exibir vídeo por #idVideo
router.get("/:idVideo", async (req, res, next) => {
    try {
        const video = new Video(
            {
                id: req.params.idVideo,
                categoria_id: req.categoria.id
            }
        )
        await video.findOne()
        res.status(200)
        res.json(video)
        
    } catch(err) {
        next(err)
    }
})

//Atualizar vídeo por #idVideo
router.patch("/:idVideo", async (req, res, next) => {
    try {
        if(Object.keys(req.body).length < 1) {
            throw new MissingData("")
        } else {
            const video = new Video(
                Object.assign(
                    {},
                    {id: req.params.idVideo},
                    {categoria_id: req.categoria.id},
                    req.body
                ))
            const newVideo = await video.update()
            res.status(200)
            res.json(newVideo)
        }
    
    } catch(err) {
        next(err)
    }
})

//Apagar um vídeo por #idVideo
router.delete("/:idVideo", async (req, res, next) => {
    try {
        const video = new Video(
            {
                id: req.params.idVideo,
                categoria_id: req.categoria.id
            }
        )
        await video.load()
        await video.delete()
        res.status(200)
        res.json(
            `Vídeo id #${req.params.idVideo} removido.`
        )

    } catch(err) {
        next(err)
    }
})

module.exports = router
