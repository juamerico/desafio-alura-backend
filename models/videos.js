const Table = require("../infrastructure/tables/videoTable")
const InvalidData = require("./errors/InvalidData")
const MissingData = require("./errors/MissingData")
const VideoNotFound = require("./errors/VideoNotFound")

class Video {
    constructor({id, titulo, descricao, url, categoria_id}) {
        this.id = id
        this.titulo = titulo
        this.descricao = descricao
        this.url = url
        this.categoria_id = categoria_id
    }

    async create() {
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
            
            return video
        }
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
            throw new NotFound(this.id)
        } else {
            this.titulo = loadedFromTable.titulo
            this.descricao = loadedFromTable.descricao
            this.url = loadedFromTable.url

            return loadedFromTable
        }
    } 

    async delete() {
        await Table.destroy(
            {
                where: {
                    id: this.id,
                    categoria_id: this.categoria_id
                }
            }
        )
    }

    async loadQuery() {
        const videos = await Table.findAll(
            {
                where: {
                    titulo: this.titulo
                }
            }
        )

        if(!videos || Object.keys(videos).length < 1) {
            throw new VideoNotFound()
        } else {
            const foundVideos = []

            videos.forEach(item => {
                foundVideos.push(
                    {
                        video: {
                            id: item.id,
                            categoria_id: item.categoria_id,
                            titulo: item.titulo,
                            descricao: item.descricao,
                            url: item.url,
                        }
                    }
                )
            })

            console.log(foundVideos)

            return foundVideos
        }
    }
}

module.exports = Video
