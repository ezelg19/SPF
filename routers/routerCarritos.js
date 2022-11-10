const { Carrito, Producto } = require("../index.js")
const { Router } = require('express')


const router = Router()
const car = new Carrito()
const productos = new Producto()

// car.save({user:'ezelg'})
// Mostrar productos de un carrito especifico
router.get('/:idCar/productos', async (req, res) => {
    try {
        res.status(200).send(await car.getProductos(req.params.idCar))
    } catch (error) {
        res.status(400).send(error)
    }
})

// Agregar un carrito
router.post('/', async (req, res) => {
    try {
        await car.save(user)
        res.sendStatus(200)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Agregar un producto a un carrito
router.post('/:idCar/productos/:idProducto', async (req, res) => {
    try {
        const productoAgregar = await productos.getById(req.params.idProducto)
        await car.newProducto(req.params.idCar,productoAgregar)
        res.sendStatus(200)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Borrar un producto de un carrito
router.delete('/:idCar/productos/:idProduct', async (req, res) => {
    try {
        await car.deleteProductoById(req.params.idCar, req.params.idProduct)
        res.sendStatus(200)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Borrar todos los productos de un carrito
router.delete('/:idCar/productos', async (req, res) => {
    try {
        await car.deleteAllProductos(req.params.idCar)
        res.sendStatus(200)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router