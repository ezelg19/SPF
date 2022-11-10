const fs = require('fs')

class Archivo {
    constructor(id = 1) {
        this.rutaArchivo = './utils/arcProducto.json'
        this.id = id
    }

    async save(obj, newObj = true) {
        const contArchivo = await this.getAll()
        // Verifico si se quiere ingresar un producto nuevo o actualizar uno existente
        if (newObj) {
            if (contArchivo.length !== 0) {
                this.id++
                await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([...contArchivo, { ...obj, id: this.id }], null, 2), 'utf-8')
            } else {
                await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([{ ...obj, id: this.id }]), 'utf-8')
            }
            return this.id
        } else { await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([...contArchivo, { ...obj }], null, 2), 'utf-8') }
    }

    async actualizar(idProd,obj) {
        const id = parseInt(idProd)
        const contArchivo = await this.getAll()
        const product = contArchivo.filter(item => item.id === id)
        if (product.length !== 0) {
            const update = Object.assign(obj,{id:id})
            await this.deleteById(update.id)
            await this.save(update, false)
        } else { return { error: 'daoProductoArc.actualizar()', descripcion: 'El id del producto ingresado no existe en la Base de Datos' } }
    }

    async getById(idProd) {
        const id = parseInt(idProd)
        const contArchivo = await this.getAll()
        const archivo = contArchivo.filter(item => item.id === id)
        if (archivo.length !== 0) { return archivo }
        else { return { error: 'daoProductoArc.getById()', descripcion: 'El id del producto ingresado no existe en la Base de Datos' } }
    }

    async getAll() {
        try {
            let contenido = await fs.promises.readFile(this.rutaArchivo, 'utf-8')
            let contParse = await JSON.parse(contenido)
            // Localizo el objeto con el Id mas alto para tener referencia de Ids para nuevos objetos
            if (contParse.length !== 0) { contParse.map(elem => { if (elem.id > this.id) { this.id = elem.id } }) }
            return contParse
        } catch (error) {
            console.error('Error leer archivo: ' + error)
        }
    }

    async deleteById(idProd) {
        const id = parseInt(idProd)
        const contArchivo = await this.getAll()
        const archivoABorrar = contArchivo.filter(item => item.id === id)
        if (archivoABorrar.length !== 0) {
            const archivoBorrado = contArchivo.filter(item => item.id !== id)
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(archivoBorrado, null, 2))
        } else { return { error: 'daoProductoArc.deleteById()', descripcion: 'El id del producto no se encontro en la Base de Batos' } }
    }

    async deleteAll() {
        await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([], null, 2), 'utf-8')
    }
}

module.exports = Archivo
