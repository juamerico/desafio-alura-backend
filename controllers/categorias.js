//A rota padrão é '/api/categorias/'

const Categoria = require("../models/categorias")
const router = require("express").Router()
const Table = require("../infrastructure/tables/categoryTable")
const MissingData = require("../models/errors/MissingData")

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
            res.send(
                JSON.stringify(novaCategoria)
            )
        }

    } catch(err) {
        next(err)
    }
})

//Exibir todas as categorias
router.get("/", async (req, res) => {
    const categorias = await Table.findAll({raw: true})
    res.status(200)
    res.send(
        JSON.stringify(categorias)
    )
})

//Exibir uma categoria por #idCategoria
router.get("/:idCategoria", async (req, res, next) => {
    try {
        const categoria = new Categoria({id: req.params.idCategoria})
        const loadedCategoria = await categoria.load()
        res.status(200)
        res.send(
            JSON.stringify(loadedCategoria)
        )
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

            // let reqBody = req.body
            
            // if(Object.keys(req.body).length >= 2) {
            //     reqBody = {categoria: req.body.categoria, cor: req.body.cor}
            // } else if(!Object.keys(req.body).cor) {
            //     reqBody = {categoria: req.body.categoria}
            // } else if(!Object.keys(req.body).categoria) {
            //     reqBody = {cor: req.body.cor}
            // }

            const updatedCategory = await category.update()
            res.status(200)
            res.send(
                JSON.stringify(updatedCategory)
            )
        }

    } catch(err) {
        next(err)
    }
})

//Apagar uma categoria por #idCategoria
router.delete("/:idCategoria", async (req, res, next) => {
    try {
        const id = req.params.idCategoria
        const categoria = new Categoria({id: id})
        await categoria.delete()
        res.status(200)
        res.send(
            `Categoria id #${id} removida.`
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
