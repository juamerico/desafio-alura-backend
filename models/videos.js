const db = require("../infrastructure/dbConnection")

class Video {
    listItems(res) {
        const sql = "SELECT * FROM Videos"

        db.query(sql, (err, result) => {
            if(err) {
                res.status(400).redirect("https://http.cat/400")
            } else {
                res.status(200).json(result)
            }
        })
    }

    addItem(video, res) {
        const sql = "INSERT INTO Videos SET ?"

        db.query(sql, video, (err) => {
            if(err) {
                res.status(400).json(err)
            } else {
                res.status(201).json(video)
            }
        })
    }

    getItemById(id, res) {
        const sql = `SELECT * FROM Videos WHERE id=${id}`

        db.query(sql, (err, result) => {
            if(err || result.length < 1) {
                res.status(404).redirect("https://http.cat/404")
            } else {
                res.status(200).json(result)
            }
        })
    }

    updateItem(id, values, res) {
        const sql = `UPDATE Videos SET ? WHERE id=${id}`

        db.query(sql, values, (err) => {
            if(err) {
                res.status(400).json(err)
            } else {
                res.status(200).json({...values, id})
            }
        })
    }

    deleteItem(id, res) {
        const sql = `DELETE FROM Videos WHERE id=${id}`

        db.query(sql, (err) => {
            if(err) {
                res.status(400).json(err)
            } else {
                res.status(200).json(`Item #${id} removido`)
            }
        })
    }
}

module.exports = new Video