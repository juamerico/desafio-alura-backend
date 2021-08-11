class MissingData extends Error {
    constructor(field) {
        super(`Campo '${field}' não informado.`)
        this.name = "MissingData"
    }
}

module.exports = MissingData
