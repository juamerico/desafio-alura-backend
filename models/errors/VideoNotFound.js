class VideoNotFound extends Error {
    constructor(id) {
        super(`Video #${id} não encontrado.`)
        this.name = "VideoNotFound"
    }
}

module.exports = VideoNotFound
