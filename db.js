const mongoose = require('mongoose');

var mongoURL = "mongodb+srv://PizzaShopDB:LWAviYB3DHjMDurA@cluster0.jh5ecod.mongodb.net/PizzaShop"
mongoose.connect(mongoURL, {useUnifiedTopology: true, useNewUrlParser: true})
var db = mongoose.connection;

db.on('connected', () => {
    console.log('mongoDB connection successful')
})
db.on('error', () => {
    console.log('monoDB connection failed')
})

module.exports = mongoose;