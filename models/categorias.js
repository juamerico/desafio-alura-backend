const Table = require("../infrastructure/tables/categoryTable")
const InvalidData = require("./errors/InvalidData")
const MissingData = require("./errors/MissingData")
const NotFound = require("./errors/CategoryNotFound")

class Categoria {
    constructor({id, categoria, cor}) {
        this.id = id
        this.categoria = categoria
        this.cor = cor
    }

    async create() {
        this.validate()
        const newCategory = await Table.create({
            categoria: this.categoria,
            cor: this.cor
        })
        
        this.categoria = newCategory.categoria
        this.cor = newCategory.cor
        this.id = newCategory.id

        return newCategory
    }

    async load() {
        const loadedFromTable = await Table.findOne({where: {id: this.id}})

        if(!loadedFromTable) {
            throw new NotFound(this.id)
        } else {
            this.categoria = loadedFromTable.categoria
            this.cor = loadedFromTable.cor

            return loadedFromTable
        }

    }

    async update() {
        await this.validate()
        const data = {cor: this.cor, categoria: this.categoria}
        const updatedCategory = await Table.update(data, {where: {id: this.id}})

        return updatedCategory
    }

    async delete() {
        const deletedCategory = await this.load()
        Table.destroy({where: {id: this.id}})

        return deletedCategory
    }

    validate() {
        const fields = ["categoria", "cor"]

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
