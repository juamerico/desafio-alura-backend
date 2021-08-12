const Table = require("../infrastructure/tables/videoTable")
const InvalidData = require("./errors/InvalidData")
const MissingData = require("./errors/MissingData")
const NotFound = require("./errors/NotFound")

class Video {
    constructor({id, titulo, descricao, url, categoria_id}) {
        this.id = id
        this.titulo = titulo
        this.descricao = descricao
        this.url = url
        this.categoria_id = categoria_id
    }

    async create() {
        this.validate()
        const newVideo = await Table.create({
            titulo: this.titulo,
            descricao: this.descricao,
            url: this.url,
            categoria_id: this.categoria_id
        })

        this.id = newVideo.id
        this.createdAt = newVideo.createdAt
        this.updatedAt = newVideo.updatedAt        

        return newVideo
    }

    async update() {
        this.findOne()

        const data = {
            url: this.url,
            descricao: this.descricao,
            titulo: this.titulo
        }
        await Table.update(
            data,
            {where: {id: this.id, categoria_id: this.categoria_id}}
        )

        return data
    }

    async findOne() {
        const videoFromTable = await Table.findOne(
            {
                where: {
                    categoria_id: this.categoria_id,
                    id: this.id
                }
            }
        )

        if(!videoFromTable) {
            throw new NotFound(this.id)
        }

    }

}

module.exports = Video
