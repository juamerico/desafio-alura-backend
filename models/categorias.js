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
        await this.validate()
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

        if(Object.keys(loadedFromTable).length === 0) {
            throw new NotFound(this.id)
        } else {
            this.categoria = loadedFromTable.categoria
            this.cor = loadedFromTable.cor
    
            return loadedFromTable
        }
    }

    async update() {
        await Table.findOne({where: {id: this.id}})
        const fields = ["categoria", "cor"]
        const newData = {}

        fields.forEach(field => {
            const data = this[field]
            if(data.length < 1) {
                throw new MissingData(field)
            } else if(typeof data !== "string") {
                throw new InvalidData(data, "string")
            } else {
                newData[field] = data
            }
        })

        await Table.update(newData, {where: {id: this.id}})

        return await Table.findOne({where: {id: this.id}})
    }

    async delete() {
        const deletedCategory = await this.load()
        Table.destroy({where: {id: this.id}})

        return deletedCategory
    }

    validate() {
        const fields = ["categoria", "cor"]

        fields.forEach(field =>  {
            let data = this[field]

            if(!data || data.value === "") {
                throw new MissingData(field)
            }
            
            if(typeof data !== "string") {
                throw new InvalidData(field, "string")
            }
        })
    }
}

module.exports = Categoria
