const { Producto } = require("../index.js")
const { Router } = require('express')

const router = Router()
const productos = new Producto()

// Mostrar todos los productos
router.get('/', async(req, res) => {
    try {
        res.status(200).send(await productos.getAll())        
    } catch (error) {
        res.status(400).send({ msg: "Error al mostrar los productos", err: error })
    }
})

// Mostrar un producto especifico
router.get("/:idProd", async(req, res) => {
    try {
        // const idProd = parseInt(req.params.idProd)
        res.status(200).send(await productos.getById(req.params.idProd))  
    } catch (error) {
        res.status(400).send({ msg: "Error al mostrar el producto", err: error })
    }
})

// Agregar un nuevo producto
router.post("/", async(req, res) => {
    try {
        await productos.save(req.body)
        res.status(200).redirect('./')
    }
    catch (error) { res.status(400).send({ msg: "Error al cargar el producto", err: error }) }
})

// Actualizar un producto existente
router.put("/:idProd", async(req, res) => {
    try{
        // const idProd = parseInt(req.params.idProd)
        // const guardado = {title:req.body.title, price:req.body.price, thumbnail:req.body.thumbnail}
        await productos.actualizar(req.params.idProd, req.body)
        res.sendStatus(200)
    } catch(error){
        res.status(400).send({ msg: "Error al actualizar el producto", err: error })
    }
})

// Borrar un producto por id
router.delete("/:idProd", async(req, res) => {
    try{
        // const idProd = parseInt(req.params.idProd)
        res.status(200).send(await productos.deleteById(req.params.idProd))
    } catch(error){
        res.status(400).send({ msg: "Error al borrar el producto", err: error })
    }
})


module.exports = router