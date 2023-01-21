const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()

const db = require('./db')
const pizza = require('./models/pizzaModel')

const pizzasRoute = require('./routes/pizzasRoute')
const userRoute = require('./routes/userRoute')

app.use(cors());
app.use(express.json())

app.use('/api/pizzas', pizzasRoute)
app.use('/api/users', userRoute)

// pass= LWAviYB3DHjMDurA
// userName = PizzaShopDB


// const uri = "mongodb+srv://PizzaShopDB:LWAviYB3DHjMDurA@cluster0.jh5ecod.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




app.get('/', (req, res) => {
    res.send('Pizza shop server was running')
})


app.listen(port, () => console.log(`server running on the port ${port}`))