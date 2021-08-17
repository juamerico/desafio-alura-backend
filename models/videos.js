const Table = require("../infrastructure/tables/videoTable")
const InvalidData = require("./errors/InvalidData")
const MissingData = require("./errors/MissingData")
const VideoNotFound = require("./errors/VideoNotFound")

class Video {
    constructor({id, titulo, descricao, url, categoria_id, createdAt, updatedAt}) {
        this.id = id
        this.titulo = titulo
        this.descricao = descricao
        this.url = url
        this.categoria_id = categoria_id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
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

    async findOne() {
        const video = await Table.findOne(
            {
                where: {
                    categoria_id: this.categoria_id,
                    id: this.id
                }
            }
        )

        if(!video) {
            throw new VideoNotFound(this.id)
        } else {
            this.url = video.url
            this.titulo = video.titulo
            this.descricao = video.descricao
            this.createdAt = video.createdAt
            this.updatedAt = video.updatedAt
            
            return video
        }
    }

    async update() {
        const newData = {}

        if(typeof this.titulo === "string") {
            newData.titulo = this.titulo
        }

        if(typeof this.descricao === "string") {
            newData.descricao = this.descricao
        }

        if(typeof this.url === "string") {
            newData.url = this.url
        }

        await Table.update(newData, {where: {id: this.id, categoria_id: this.categoria_id}})
        
        return await this.load()
    }

    async load() {
        const loadedFromTable = await Table.findOne(
            {
                where: {
                    id: this.id,
                    categoria_id: this.categoria_id
                }
            }
        )

        if(!loadedFromTable) {
            throw new VideoNotFound(this.id)
        } else {
            this.titulo = loadedFromTable.titulo
            this.descricao = loadedFromTable.descricao
            this.url = loadedFromTable.url

            return loadedFromTable
        }
    } 

    async delete() {
        await this.load()
        Table.destroy(
            {
                where: {
                    id: this.id,
                    categoria_id: this.categoria_id
                }
            }
        )
    }

    validate() {
        const fields = ["titulo", "url", "descricao"]

        fields.forEach(field => {
            if(this[field].length < 1) {
                throw new MissingData(field)
            } else if(typeof this[field] !== "string") {
                throw new InvalidData(field, "string")
            }
        })
    
        // if(this.url.length < 1) {
        //     throw new MissingData("url")
        // }

        // if(this.descricao.length < 1) {
        //     throw new MissingData("descricao")
        // }
    }
}

module.exports = Video
