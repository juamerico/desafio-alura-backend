class VideoNotFound extends Error {
    constructor() {
        super(`Video não encontrado.`)
        this.name = "VideoNotFound"
    }
}

module.exports = VideoNotFound
