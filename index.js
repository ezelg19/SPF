const persistencia = 'mongo'

let Carrito = require("./daos/carrito/daoCarritoMem.js")
let Producto = require("./daos/productos/daoProductosMem.js")

if (persistencia === "mongo") {
    Carrito = require("./daos/carrito/daoCarritoMDB.js")
    Producto = require("./daos/productos/daoProductosMDB.js")
}
if (persistencia === "firebase") {
    Carrito = require("./daos/carrito/daoCarritoFir.js")
    Producto = require("./daos/productos/daoProductosFir.js")
}
if (persistencia === "archivo") {
    Carrito = require("./daos/carrito/daoCarritoArc.js")
    Producto = require("./daos/productos/daoProductosArc.js")   
}

module.exports = { Carrito, Producto }