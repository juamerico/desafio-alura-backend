const Video = require("../models/videos")

module.exports = app => {
    app.get("/videos", (req, res) => {
        Video.listItems(res)
    })

    app.post("/videos", (req, res) => {
        const video = req.body

        Video.addItem(video, res)
    })

    app.get("/videos/:id", (req, res) => {
        const id = parseInt(req.params.id)

        Video.getItemById(id, res)
    })

    app.patch("/videos/:id", (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body

        Video.updateItem(id, values, res)
    })

    app.delete("/videos/:id", (req, res) => {
        const id = parseInt(req.params.id)

        Video.deleteItem(id, res)
    })
}
