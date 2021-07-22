const connection = require("../infrastructure/connection")

class Video {
    add(video, res) {
        const videos = {...video}
        const sql = "INSERT INTO Videos SET ?"

        connection.query(sql, videos, (err, results) => {
            if(err) {
                res.status(400).json(err)
            } else {
                res.status(201).json(video)
            }
        })
    }
}

module.exports = new Video