class Memoria {
    constructor(id = 1) {
        this.memoria = []
        this.id = id
    }

    save(obj, newObj = true) {
        const contMemoria = this.getAll()
        // Verifico si se quiere ingresar un carrito nuevo o actualizar uno existente
        if (newObj) {
            if (contMemoria.length !== 0) {
                this.id++
            }
            this.memoria.push({ obj, id: this.id })
            return this.id
        } else { this.memoria.push(obj) }
    }

    getById(id) {
        const contArchivo = this.memoria
        const carrito = contArchivo.filter(item => item.id === id)
        if (carrito.length !== 0) { return carrito }
        else { return { error: 'ClassCarritoMem.getById()', descripcion: 'El id del carrito ingresado no existe en la Base de Datos' } }
    }

    getAll() {
        try {
            let contenido = this.memoria
            // Localizo el carrito con el Id mas alto para tener referencia de Ids para nuevos carritos
            if (contenido.length !== 0) { contenido.map(elem => { if (elem.id > this.id) { this.id = elem.id } }) }
            return contenido
        } catch (error) {
            console.error('Error leer archivo: ' + error)
        }
    }

    deleteById(id) {
        const contMemoria = this.memoria
        const carritoABorrar = contMemoria.filter(item => item.id === id)
        if (carritoABorrar.length !== 0) {
            const carritoBorrado = contMemoria.filter(item => item.id !== id)
            this.memoria = carritoBorrado
        } else { return { error: 'ClassCarritoMem.deleteById()', descripcion: 'El id del carrito no se encontro en la Base de Batos' } }
    }

    deleteAll() {
        this.memoria = []
    }

    newProducto(productoAAgregar, idCarrito) {
        const contMemoria = this.memoria
        const carrito = contMemoria.filter(item => item.id === idCarrito)
        if (carrito.length !== 0) {
            carrito[0].productos.push(productoAAgregar[0])
            this.deleteById(idCarrito)
            this.save(carrito[0], false)
            return {}
        } else { return { error: 'ClassCarritoMem.newProducto()', descripcion: 'El id del carrito ingresado no existe en la Base de Datos' } }
    }

    getProductos(idCarrito) {
        const contMemoria = this.memoria
        const carrito = contMemoria.filter(item => item.id === idCarrito)
        if (carrito.length !== 0) {
            return carrito[0].productos
        } else { return { error: 'ClassCarritoMem.getProductos()', descripcion: 'El id del carrito ingresado no existe en la Base de Datos' } }
    }

    deleteProductoById(idCarrito, idProducto) {
        const contMemoria = this.memoria
        const carrito = contMemoria.filter(item => item.id === idCarrito)
        if (carrito.length !== 0) {
            const productos = carrito[0].productos
            const existe_producto = productos.filter(item => item.id === idProducto)
            if (existe_producto.length !== 0) {
                const filtrado = productos.filter(item => item.id !== idProducto)
                carrito[0].productos = filtrado
                this.deleteById(idCarrito)
                this.save(carrito[0], false)
                return {}
            } else { return { error: 'ClassCarritoMem.deleteProductoById()', descripcion: 'El id del producto ingresado no existe en este carrito' } }
        } else { return { error: 'ClassCarritoMem.deleteProductoById()', descripcion: 'El id del carrito ingresado no existe en la Base de Datos' } }
    }

    deleteAllProductos(idCarrito) {
        const contMemoria = this.memoria
        const carrito = contMemoria.filter(item => item.id === idCarrito)
        if (carrito.length !== 0) {
            carrito[0].productos = []
            this.deleteById(idCarrito)
            this.save(carrito[0], false)
            return {}
        } else{ return {error: 'classCarritoMem.deleteAllProducto()', descripcion: 'El id del carrito ingresado no existe en la Base de Datos'}}
    }
}


module.exports = Memoria
