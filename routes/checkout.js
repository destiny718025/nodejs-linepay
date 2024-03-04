const express = require('express');
const router = express.Router();
const sampleData = require('../sample/sampleData');
const linePayService = require('../services/linePayService');
require('dotenv').config();
const {
    LINEPAY_RETURN_HOST,
    LINEPAY_RETURN_CONFIRM_URL,
    LINEPAY_RETURN_CANCEL_URL
} = process.env;
const orders = {};

// router.get('/:id', function(req, res) {
router.get('/checkout/:id', function(req, res) {
    const { id } = req.params;
    const order = sampleData[id];
    order.orderId = parseInt(new Date().getTime() / 1000);
    orders[order.orderId] = order;
    res.render('checkout', { order });
});
router.post('/createOrder/:orderId', async function (req, res) {
    try {
        const { orderId } = req.params;
        const order = orders[orderId];
        
        const linePayBody = {
            ...order,
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
