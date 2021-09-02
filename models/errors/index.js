class MissingData extends Error {
    constructor(field) {
        super(`Campo(s) ${field} não informado(s).`)
        this.name = "MissingData"
    }
}

class VideoNotFound extends Error {
    constructor(id) {
        super(`Video #${id} não encontrado.`)
        this.name = "VideoNotFound"
    }
}

class InvalidData extends Error {
    constructor(field, type) {
        super(`Campo '${field}' inválido. Deve ser do tipo '${type}'`)
        this.name = "InvalidData"
    }
}

class CategoryNotFound extends Error {
    constructor(id) {
        super(`Categoria #${id} não encontrada.`)
        this.name = "CategoryNotFound"
    }
}

class UserNotFound extends Error {
    constructor() {
        super("Usuário não encontrado")
        this.name = "UserNotFound"
    }
}

class InvalidPassword extends Error {
    constructor(message) {
        super(message)
        this.name = "InvalidPassword"
    }
}

class AlreadyInUse extends Error {
    constructor(email) {
        super(`Email ${email} já cadastrado.`)
    }
}

module.exports = {
    MissingData,
    VideoNotFound,
    InvalidData,
    CategoryNotFound,
    InvalidPassword,
    UserNotFound,
    AlreadyInUse,
}
