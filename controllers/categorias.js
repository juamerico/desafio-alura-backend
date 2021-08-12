//A rota padrão é '/api/categorias/'

const Categoria = require("../models/categorias")
const router = require("express").Router()
const Table = require("../infrastructure/tables/categoryTable")

//Criar nova categoria
router.post("/", async (req, res, next) => {
    try {
        const categoria = new Categoria(req.body)
        const createdCategory = await categoria.create()
        res.status(201)
        res.send(
            `Categoria criada: ${JSON.stringify(createdCategory)}`
        )

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

//Editar uma categoria por #id
router.patch("/:id", async (req, res, next) => {
    try{
        const reqBody = req.body
        const id = req.params.id
        const data = Object.assign(
            {},
            {id: id},
            reqBody
        )
        const categoria = new Categoria(data)
        await categoria.update()
        res.status(201)
        res.send(
            `Dados atualizados: ${JSON.stringify(categoria)}`
        )

    } catch(err) {
        next(err)
    }
})

//Apagar uma categoria por #id
router.delete("/:id", async (req, res, next) => {
    try {
        const id = req.params.id
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
