const { initializeApp } = require("firebase/app")
const { collection, doc, addDoc, getFirestore, getDocs, getDoc, updateDoc, deleteDoc } = require("firebase/firestore")
const fs = require('fs')

const firebaseConfig = {
    apiKey: "AIzaSyBcO8Zb7cY8s6UCSu-Ufk3r37DlkdEPvsw",
    authDomain: "segundo-entrega-final.firebaseapp.com",
    projectId: "segundo-entrega-final",
    storageBucket: "segundo-entrega-final.appspot.com",
    messagingSenderId: "927057010025",
    appId: "1:927057010025:web:45e437dd273f470f35b1f8",
    measurementId: "G-901T3J81L7"
};

class Firebase {
    constructor() {
        // Initialize Firebase
        this.app = initializeApp(firebaseConfig);
        this.db = getFirestore()
    }

    async cargarBaseDeDatos() {
        const promise = await fs.promises.readFile('./utils/arcCarrito.json', 'utf-8')
        const carritos = await JSON.parse(promise)
        carritos.forEach(async (car) => {
            await addDoc(collection(this.db, "carritos"), {
                timestamp: car.timestamp,
                user: car.user,
                productos: car.productos
            })
        })
    }

    async save(user) {
        try {
            const estado = await addDoc(collection(this.db, "carritos"), {
                timestamp: new Date().toLocaleString(),
                user: user,
                productos: []
            })
            return estado
        } catch (error) {
            return { descripcion: 'daoCarritoFir.save()', error: error }
        }
    }

    async getById(id) {
        try {
            const carrito = await getDoc(doc(this.db, "carritos", id))
            const car = [carrito.id, carrito.data()]
            return car
        } catch (error) {
            console.log({ descripcion: 'daoCarritoFir.getById()', error: error })
            return { descripcion: 'daoCarritoFir.getById()', error: error }
        }
    }

    async getAll() {
        try {
            const carrito = await getDocs(collection(this.db, "carritos"))
            const items = carrito.docs.map(car => [car.id, car.data()])
            return items
        } catch (error) {
            return { descripcion: 'daoCarritoFir.getAll()', error: error }
        }
    }

    async deleteById(id) {
        try {
            const estado = await deleteDoc(doc(this.db, "carritos", id))
            return estado
        } catch (error) {
            return { descripcion: 'daoCarritoFir.deleteById()', error: error }
        }
    }

    async actualizar(idCar, info) {
        try {
            const estado = await updateDoc(doc(this.db, "carritos", idCar), info)
            return estado
        } catch (error) {
            return { descripcion: 'daoCarritoFir.actualizar()', error: error }
        }
    }

    async newProducto(idCar, prod) {
        try {
            const carrito = await getDoc(doc(this.db, "carritos", idCar))
            const car = carrito.data()
            car.productos.push({id:prod[0],producto:prod[1]})
            return this.actualizar(idCar, car)
        } catch (error) {
            return { descripcion: 'daoCarritoFir.newProducto()', error: error }
        }
    }

    async getProductos(idCar){
        try {
            const carrito = await getDoc(doc(this.db, "carritos", idCar))
            return carrito.data().productos
        } catch (error) {
            return { descripcion: 'daoCarritoFir.getProductos()', error: error }
        }
    }

    async deleteProductoById(idCar, idProd) {
        try {
            const carrito = await getDoc(doc(this.db, "carritos", idCar))
            const car = carrito.data()
            const productos = car.productos
            const existe_producto = productos.filter(item => item.id === idProd)
            if (existe_producto.length !== 0) {
                const filtrado = productos.filter(item => item.id !== idProd)
                car.productos = filtrado
                return this.actualizar(idCar,car)
            } else { return { error: 'classCarritoFir.deleteProductoById()', descripcion: 'El id del producto ingresado no existe en este carrito' } }
        } catch (error) {
            return { descripcion: 'daoCarritoFir.deleteProductoById()', error: error }
        }
    }

    async deleteAllProductos(idCar) {
        try {
            const carrito = await getDoc(doc(this.db, "carritos", idCar))
            const car = carrito.data()
            car.productos = []
            console.log(car.productos)
            return this.actualizar(idCar,car)
        } catch (error) {
            return { descripcion: 'daoCarritoFir.deleteAllProductos()', error: error }
        }
    }
}

module.exports = Firebase