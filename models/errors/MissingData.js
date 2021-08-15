class MissingData extends Error {
    constructor(field) {
        super(`Campo(s) ${field} não informado(s).`)
        this.name = "MissingData"
    }
}

module.exports = MissingData
