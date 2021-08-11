const router = require("express").Router({mergeParams: true})
const Video = require("../models/videos")

router.post("/", (req, res) => {
    const video = new Video({
        descricao: req.body.descricao,
        url: req.body.descricao,
        titulo: req.body.titulo
    })
    video.addItem()
    res.status(201)
    res.send(
        JSON.stringify(video)
    )
})

module.exports = router
