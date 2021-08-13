class CategoryNotFound extends Error {
    constructor(id) {
        super(`Categoria #${id} não encontrada.`)
        this.name = "CategoryNotFound"
    }
}

module.exports = CategoryNotFound
