class InvalidData extends Error {
    constructor(field, type) {
        super(`Campo '${field}' inválido. Deve ser do tipo '${type}'`)
        this.name = "InvalidData"
    }
}

module.exports = InvalidData
