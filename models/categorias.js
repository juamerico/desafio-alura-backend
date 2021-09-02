const Table = require("../infrastructure/tables/categoryTable")
const {InvalidData, MissingData, CategoryNotFound} = require("./errors")

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

        if(!loadedFromTable) {
            throw new CategoryNotFound()
        } else {
            this.categoria = loadedFromTable.categoria
            this.cor = loadedFromTable.cor
    
            return loadedFromTable
        }
    }

    async update() {
        const newData = {}

        if(typeof this.categoria === "string") {
            newData.categoria = this.categoria
        }
        
        if(typeof this.cor === "string") {
            newData.cor = this.cor
        }

        await Table.update(newData, {where: {id: this.id}})

        return await Table.findOne({where: {id: this.id}})
    }

    async delete() {
        await this.load()
        return Table.destroy({where: {id: this.id}})
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
