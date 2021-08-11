const db = require("../infrastructure/dbConnection")

class Video {
    constructor(titulo, descricao, url) {
        this.titulo = titulo
        this.descricao = descricao
        this.url = url
    }

    listItems() {

    }

    async addItem() {
        const newVideo = await db.create({
            titulo: this.titulo,
            descricao: this.descricao,
            url: this.url
        })
        this.id = newVideo.id
        return newVideo
    }

    getItemById() {
        
    }

    updateItem() {
        
    }

    deleteItem() {
        
    }
}

module.exports = new Video