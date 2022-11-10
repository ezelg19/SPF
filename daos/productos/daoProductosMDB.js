const mongoose = require('mongoose')
const model = require('./model/modelProductoMDB.js')

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
            console.log('Base de Datos Mongo conectada')
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
            return { descripcion: 'daoProductosMDB.save()', error: error }
        }
    }
    
    async actualizar(obj) {
        try {
            let update = await model.updateOne({[this.ID_FIELD]: obj.id}, {$set: obj})
            return update
        } catch (error) {
            return { descripcion: 'daoProductoMDB.actualizar()', error: error}  
        }
    }


    async getById(idProd) {
        try {
            const product = await model.findOne({ [this.ID_FIELD]: idProd })
            return product;
        } catch (error) {
            return { descripcion: 'daoProductoMDB.getById()', error: error }
        }
    }
    
    async getAll() {
        try {
            return await model.find();
        } catch (error) {
            return { descripcion: 'daoProductoMDB.getALl()', error: error }
        }
    }

    async deleteById(id) {
        try {
            const borrar = await model.deleteOne({[this.ID_FIELD]:id})
            return borrar
        } catch (error) {
            return { descripcion: 'daoProductoMDB.deleteById()', error: error }
        }
    }

    // async deleteAll() {
    //     try {
            
    //     } catch (error) {
    //         return { descripcion: 'daoProductoMDB.deleteAll()', error: error }
    //     }
    // }
}

module.exports = MDB
