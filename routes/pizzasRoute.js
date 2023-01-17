const express = require('express')
const router = express.Router();

const pizza = require('../models/pizzaModel')

router.get('/getAllPizzas', async(req, res)=>{
    try {
        const pizzas = await pizza.find({})
        res.send(pizzas)
    } catch (error) {
        res.status(400).json({message: error})   
    }
})

module.exports = router;