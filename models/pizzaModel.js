const mongoose = require('mongoose');
const pizzaScheme = mongoose.Schema({
    name: {type: String, require},
    varients: [],
    prices: [],
    category: {type: String, require},
    img: {type: String, require},
    description: {type: String, require},
}, {
    timestamps: true,
})

const pizzaModel = mongoose.model('pizzas', pizzaScheme)
module.exports = pizzaModel