const { Schema, model } = require("mongoose")

const schema = new Schema({
    nombre: { type: String, max: 100, required: true },
    precio: { type: Number, max: 999999, required: true },
    descripcion: { type: String, max: 200 },
    codigo: { type: Number, max: 99999999999, required: true, unique: true },
    img: { type: String, max: 200 },
    stock: { type: Number, max: 99999, require: true }
})

module.exports = model('productos', schema)
