class Memoria {
    constructor(id = 1) {
        this.memoria = []
        this.id = id
    }

    save(obj, newObj = true) {
        const contMemoria = this.getAll()
        // Verifico si se quiere ingresar un producto nuevo o actualizar uno existente
        if (newObj) {
            if (contMemoria.length !== 0) {
                this.id++
            }
            this.memoria.push({ obj, id: this.id })
            return this.id
        } else { this.memoria.push(obj) }
    }

    actualizar(obj) {
        const contMemoria = this.memoria
        const product = contMemoria.filter(item => item.id === obj.id)
        if (product.length !== 0) {
            this.deleteById(obj.id)
            this.save(obj, false)
        } else { return { error: 'classProductoMem.actualizar()', descripcion: 'El id del producto ingresado no existe en la Base de Datos' } }
    }

    getById(id) {
        const contMemoria = this.memoria
        const archivo = contMemoria.filter(item => item.id === id)
        if (archivo.length !== 0) { return archivo }
        else { return { error: 'classProductoMem.getById()', descripcion: 'El id del producto ingresado no existe en la Base de Datos' } }
    }

    getAll() {
        try {
            let contenido = this.memoria
            // Localizo el producto con el Id mas alto para tener referencia de Ids para nuevos productos
            if (contenido.length !== 0) { contenido.map(elem => { if (elem.id > this.id) { this.id = elem.id } }) }
            return contenido
        } catch (error) {
            console.error('Error leer archivo: ' + error)
        }
    }

    deleteById(id) {
        const contMemoria = this.memoria
        const productoABorrar = contMemoria.filter(item => item.id === id)
        if (productoABorrar.length !== 0) {
            const productoBorrado = contMemoria.filter(item => item.id !== id)
            this.rutaArchivo = productoBorrado
        } else { return { error: 'classProductoMem.deleteById()', descripcion: 'El id del producto no se encontro en la Base de Batos' } }
    }

    deleteAll() {
        this.memoria = []
    }
}

module.exports = Memoria
