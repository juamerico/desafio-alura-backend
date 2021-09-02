const Table = require("../infrastructure/tables/userTable")
const bcrypt = require("bcrypt")
const {InvalidPassword, AlreadyInUse, UserNotFound} = require("../models/errors")

class Usuario {
    constructor({id, username, email, passwordInput, passwordConfirm, hashedPassword}) {
        this.id = id
        this.username = username
        this.email = email
        this.passwordInput = passwordInput
        this.passwordConfirm = passwordConfirm
        this.hashedPassword = hashedPassword
    }

    async create() {
        const user = await Table.findAll({where: {email: this.email}})

        if(Object.keys(user).length > 0) {
            throw new AlreadyInUse(this.email)
        }
        
        await this.inputToHashed()

        const newUser = await Table.create({
            username: this.username,
            email: this.email,
            password: this.hashedPassword
        })

        return newUser
    }

    async inputToHashed() {
        const hashedPass = await bcrypt.hash(this.passwordInput, 12)
        this.hashedPassword = hashedPass
    }

    async findByEmail() {
        const query = await Table.findOne({where: {email: this.email}, raw: true})
        console.log(query)
        if(Object.keys(query).length === 0) {
            throw new UserNotFound()
        } else {
            this.id = query.id
            this.username = query.username
            this.hashedPassword = query.password
        }

        await this.compare()
    }

    async compare() {
        if(!await bcrypt.compare(this.passwordInput, this.hashedPassword)) {
            throw new InvalidPassword("Senha incorreta")
        }    
    }
}

module.exports = Usuario
