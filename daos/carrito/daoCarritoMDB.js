const mongoose = require('mongoose')
const model = require('./model/modelCarritoMDB.js')
const modelProd = require('../productos/model/modelProductoMDB.js')

class MDB {

    constructor() {
        this.ID_FIELD = "_id"
        this.connect()
    }

    async connect() {
        try {
            const URL = 'mongodb://localhost:27017/ecommerce'
            const rta = await mongoose.connect(URL, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            })
        } catch (error) {
            console.log('Error al conectarse a la Base de Datos en Mongo', error)
        }
    }

    async save(obj) {
        try {
            const prod = new model(obj)
            const guardado = await prod.save()
            return guardado
        } catch (error) {
            return { descripcion: 'daoCarritoMDB.save()', error: error }
        }
    }

    async getById(idCar) {
        try {
            const product = await model.findOne({ [this.ID_FIELD]: idCar })
            return product
        } catch (error) {
            return { descripcion: 'daoCarritoMDB.getById()', error: error }
        }
    }

    async getAll() {
        try {
            return await model.find();
        } catch (error) {
            return { descripcion: 'daoCarritoMDB.getALl()', error: error }
        }
    }

    async deleteById(id) {
        try {
            const borrar = await model.deleteOne({ [this.ID_FIELD]: id })
            return borrar
        } catch (error) {
            return { descripcion: 'daoCarritoMDB.deleteById()', error: error }
        }
    }

    async newProducto(idCar, productoAAgregar) {
        try {
            const car = await this.getById(idCar)
            car.productos.push(productoAAgregar)
            await this.actualizar(car)
        } catch (error) {
            return { descripcion: 'daoCarritoMDB.newProducto()', error: error }
        }

    }

    async getProductos(idCar) {
        try {
            const car = await this.getById(idCar)
            return car.productos
        } catch (error) {
            return { descripcion: 'daoCarritoMDB.getProductos()', error: error }
        }
    }

    async deleteProductoById(idCar, idProd) {
        try {
            const car = await this.getById(idCar)
            const productos = car.productos
            const existe_producto = productos.filter(item => item._id.toString() === idProd)
            if (existe_producto.length !== 0) {
                const filtrado = productos.filter(item => item._id.toString() !== idProd)
                car.productos = filtrado
                return await this.actualizar(car)
            } else { return { descripcion: 'classCarritoArc.deleteProductoById()', error: 'El id del producto ingresado no existe en este carrito' } }
        } catch (error) {
            return { descripcion: 'daoCarritoMDB.deleteProductoById()', error: error }
        }
    }

    async deleteAllProductos(idCar) {
        try {
            const car = await this.getById(idCar)
            car.productos = []
            return await this.actualizar(car)
        } catch (error) {
            return { descripcion: 'daoCarritoMDB.deleteAllProducto()', error: error }
        }
    }

    async actualizar(obj) {
        try {
            let update = await model.updateOne({ [this.ID_FIELD]: obj.id }, { $set: obj })
            return update
        } catch (error) {
            return { descripcion: 'daoCarritoMDB.actualizar()', error: error }
        }
    }
}

module.exports = MDB