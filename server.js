const express = require('express')
const routerCar = require('./routers/routerCarritos.js')
const routerProductos = require('./routers/routerProductos.js')
const routerDefault = require('./routers/routerDefault.js')

//Cargar base de datos en firebase
// const Prod = require('./daos/productos/daoProductosFir.js')
// const Car = require('./daos/carrito/daoCarritoFir.js')
// const productos = new Prod()
// const car = new Car()
// productos.cargarBaseDeDatos()
// car.cargarBaseDeDatos()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/car', routerCar)
app.use('/productos', routerProductos)
app.use('/', routerDefault)


app.listen(8080,()=>{console.log('server conectado')})