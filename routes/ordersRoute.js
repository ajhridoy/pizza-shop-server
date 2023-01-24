const express = require('express')
const router = express.Router();
const order = require('../models/orderModel')
const stripe = require('stripe')('sk_test_51M6Kg1K1vrlZjflDmdp7pdZkx5bpSPsl4N044W2Faqe8Ttbj9JPRGuJemhijJQ3WBlvfJGmOx8Ds7CGjs4H0O6uR00ryIaTqiv');
const { v4: uuidv4 } = require('uuid');

router.post('/placeorders', async(req, res)=>{
    const {token, subTotal, currentUser, cartItems} = req.body
    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const payment = await stripe.charges.create({
            amount: subTotal*100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email
        }, {
            idempotencyKey: uuidv4()
        })
        if(payment){
            const newOrder = new order({
                name : currentUser.name,
                email : currentUser.email,
                userid : currentUser._id,
                orderItems : cartItems,
                shippingAddress : {
                    street : token.card.address_line1,
                    city : token.card.address_city,
                    country : token.card.address_country,
                    pincode : token.card.address_zip,
                },
                orderAmount : subTotal,
                transactionId : payment.source.id,
            })
            newOrder.save()
            res.send('Order Placed Successfully')
        }
        else{
            res.send('Payment Failed')
        }
    } catch (error) {
        res.status(400).json({message: 'Something Went Wrong' + error})   
    }
})

router.post('/getUserOrders', async(req, res) => {
    const {userid} = req.body;
    try {
        const orders = await order.find({userid: userid}).sort({_id: -1})
        res.send(orders)
    } catch (error) {
        res.status(400).json({message: 'Something Went Wrong' + error}) 
    }
})

module.exports = router;