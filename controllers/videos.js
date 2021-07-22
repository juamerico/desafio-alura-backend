const Video = require("../models/videos")

module.exports = app => {
    app.post("/videos", (req, res) => {
        const video = req.body

        Video.add(video, res)
    })
}
