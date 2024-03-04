const express = require('express');
const router = express.Router();
const sampleData = require('../sample/sampleData');
const linePayService = require('../services/linePayService');
const orderRepository = require('../repositories/orderRepository');
require('dotenv').config();
const {
    LINEPAY_RETURN_HOST,
    LINEPAY_RETURN_CONFIRM_URL,
    LINEPAY_RETURN_CANCEL_URL
} = process.env;
const orders = {};

const OrderRepository = new orderRepository();

// router.get('/:id', function(req, res) {
router.get('/checkout/:id', async function(req, res) {
    const { id } = req.params;

    const order = await OrderRepository.create(sampleData[id]);
    console.log(order.orderDetails);

    res.render('checkout', { order });
});
router.post('/createOrder/:orderId', async function (req, res) {
    try {
        const { orderId } = req.params;
        const order = await OrderRepository.getById(orderId);
        
        const linePayBody = {
            amount: order.amount,
            currency: order.currency,
            orderId:order.id,
            packages: [
                {
                    id: order.id,
                    amount: order.amount,
                    products: JSON.parse(JSON.stringify(order.orderDetails))
                }
            ],
            redirectUrls: {
                confirmUrl: `${LINEPAY_RETURN_HOST}${LINEPAY_RETURN_CONFIRM_URL}`,
                cancelUrl: `${LINEPAY_RETURN_HOST}${LINEPAY_RETURN_CANCEL_URL}`
            }
        }

        const redirectUrl = await linePayService.requestApi(linePayBody);
        res.redirect(redirectUrl);
    } catch (error) {
        console.log(error);
        res.end();
    }
});

module.exports = router;
