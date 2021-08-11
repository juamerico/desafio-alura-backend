class NotFound extends Error {
    constructor(id) {
        super(`Categoria #${id} não disponível para exclusão.`)
        this.name = "NotFound"
    }
}

module.exports = NotFound
