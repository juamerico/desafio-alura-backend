const Table = require("../infrastructure/tables/categoryTable")
const InvalidData = require("./errors/InvalidData")
const MissingData = require("./errors/MissingData")
const NotFound = require("./errors/NotFound")

class Categoria {
    constructor({id, titulo, cor}) {
        this.id = id
        this.titulo = titulo
        this.cor = cor
    }

    async load() {
        const loadedFromTable = await Table.findOne({where: {id: this.id}})

        if(!loadedFromTable) {
            throw new NotFound(this.id)
        } else {
            this.titulo = loadedFromTable.titulo
            this.cor = loadedFromTable.cor

            return loadedFromTable
        }

    }

    async create() {
        this.validate()
        const newCategory = await Table.create({
            titulo: this.titulo,
            cor: this.cor
        })
        
        this.titulo = newCategory.titulo
        this.cor = newCategory.cor
        this.id = newCategory.id

        return newCategory
    }

    async update() {
        await this.validate()
        const data = {cor: this.cor, titulo: this.titulo}
        const updatedCategory = await Table.update(data, {where: {id: this.id}})

        return updatedCategory
    }

    async delete() {
        const deletedCategory = await this.load()
        Table.destroy({where: {id: this.id}})

        return deletedCategory
    }

    validate() {
        const fields = ["titulo", "cor"]

        fields.forEach(field =>  {
            const value = this[field]
            console.log(field)
            if(!value || value.length < 1) {
                throw new MissingData(field)
            }

            if(typeof value !== "string") {
                throw new InvalidData(field, "string")
            }
        })
    }
}

module.exports = Categoria
