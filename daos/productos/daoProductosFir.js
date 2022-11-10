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
    const promise = await fs.promises.readFile('./utils/arcProducto.json', 'utf-8')
    const productos = await JSON.parse(promise)
    productos.forEach(async (producto) => {
      await addDoc(collection(this.db, "productos"), {
        timestamp: producto.timestamp,
        nombre: producto.nombre,
        stock: producto.stock,
        precio: producto.precio,
        img: producto.img,
        descripcion: producto.descripcion,
        codigo: producto.codigo
      })
    })
  }

  async save(obj) {
    try {
      const estado = await addDoc(collection(this.db, "productos"), {
        timestamp: new Date().toLocaleString(),
        nombre: obj.nombre,
        stock: obj.stock,
        precio: obj.precio,
        img: obj.img,
        descripcion: obj.descripcion,
        codigo: obj.codigo
      })
      return estado
    } catch (error) {
      return { descripcion: 'daoProductosFir.save()', error: error }
    }
  }

  async actualizar(id, info) {
    try {
      const estado = await updateDoc(doc(this.db, "productos", id), info)
      return estado
    } catch (error) {
      return { descripcion: 'daoProductosFir.actualizar()', error: error }
    }
  }

  async getById(id) {
    try {
      const producto = await getDoc(doc(this.db, "productos", id))
      const prod = [producto.id, producto.data()]
      return prod
    } catch (error) {
      console.log({ descripcion: 'daoProductosFir.getById()', error: error })
      return { descripcion: 'daoProductosFir.getById()', error: error }
    }
  }

  async getAll() {
    try {
      const productos = await getDocs(collection(this.db, "productos"))
      const items = productos.docs.map(producto => [producto.id, producto.data()])
      return items
    } catch (error) {
      return { descripcion: 'daoProductosFir.getAll()', error: error }
    }
  }


  async deleteById(id) {
    try {
      const estado = await deleteDoc(doc(this.db, "productos", id))
      return estado
    } catch (error) {
      return { descripcion: 'daoProductosFir.deleteById()', error: error }
    }
  }
}

module.exports = Firebase