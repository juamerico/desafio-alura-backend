class NotFound extends Error {
    constructor(id) {
        super(`Categoria #${id} não encontrada.`)
        this.name = "NotFound"
    }
}

module.exports = NotFound
