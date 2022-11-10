const { Schema, model } = require("mongoose")

const Car = new Schema({
    user: { type: String, max: 100 },
    productos: { type: Array}
})

module.exports = model("carritos", Car);