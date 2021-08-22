//A rota padrão é '/api/categorias/'

const Categoria = require("../models/categorias")
const router = require("express").Router()
const Table = require("../infrastructure/tables/categoryTable")
const MissingData = require("../models/errors/MissingData")
const CategoryNotFound = require("../models/errors/CategoryNotFound")

//Criar nova categoria
router.post("/", async (req, res, next) => {
    try {
        const categoria = new Categoria(
            {
                categoria: req.body.categoria,
                cor: req.body.cor
            }
        )
        if(Object.keys(req.body).length < 1) {
            throw new MissingData("")
        } else {
            const novaCategoria = await categoria.create()
            res.status(201)
            res.json(novaCategoria)
        }

    } catch(err) {
        next(err)
    }
})

//Exibir todas as categorias - com paginação
router.get("/", async (req, res, next) => {
    try {
        if(Object.keys(req.query).length === 0) {
            const categories = await Table.findAll({raw: true})
            if(categories.length < 1) {
                throw new CategoryNotFound("")
            } else {
                res.status(200)
                res.json(categories)
            }
        } else {
            const categories = await Table.findAll({raw: true})
            if(categories.length < 1) {
                throw new CategoryNotFound("")
            } else {
                const page = parseInt(req.query.page)
                const limit = 5
            
                const startIndex = (page - 1) * limit
                const endIndex = page * limit
            
                const results = {}
            
                if (endIndex < categories.length) {
                    results.next = {
                        page: page + 1
                    }
                }
            
                if(startIndex > 0) {
                    results.previous = {
                        page: page - 1
                    }
                }
            
                results.current = {page: page}
                results.results = categories.slice(startIndex, endIndex)
                
                res.send(results)
            }        
        }

    } catch(err) {
        next(err)
    }
})

//Exibir uma categoria por #idCategoria
router.get("/:idCategoria", async (req, res, next) => {
    try {
        const categoria = new Categoria({id: req.params.idCategoria})
        const loadedCategoria = await categoria.load()
        res.status(200)
        res.json(loadedCategoria)
    } catch(err) {
        next(err)
    }
})

//Editar uma categoria por #idCategoria
router.patch("/:idCategoria", async (req, res, next) => {
    try{
        if(Object.keys(req.body).length < 1) {
            throw new MissingData("")
        } else {
            const category = new Categoria(
                Object.assign(
                    {},
                    req.body,
                    {id: req.params.idCategoria}
                )
            )
            const updatedCategory = await category.update()
            res.status(200)
            res.json(updatedCategory)
        }

    } catch(err) {
        next(err)
    }
})

//Apagar uma categoria por #idCategoria
router.delete("/:idCategoria", async (req, res, next) => {
    try {
        const categoria = new Categoria({id: req.params.idCategoria})
        await categoria.delete()
        res.status(200)
        res.json(
            `Categoria id #${req.params.idCategoria} removida.`
        )

    } catch(err) {
        next(err)
    }
})


//
const videosRouter = require("./videos")

//Middleware para rotas de vídeos
const categoryCheck = async (req, res, next) => {
    try {
        const categoria = new Categoria({id: req.params.idCategoria})
        await categoria.load()
        req.categoria = categoria
        next()

    } catch(err) {
        next(err)
    }
}

router.use("/:idCategoria/videos", categoryCheck, videosRouter)

module.exports = router
