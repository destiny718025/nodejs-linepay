const express = require('express');
const router = express.Router();
const linePayService = require('../services/linePayService');


router.get('/confirm', function(req, res) {
    const { transactionId, orderId } = req.query;

    const linePayBody = {
        amount: 2000,
        currency: 'TWD'
    };
    if (linePayService.confirmApi(transactionId, linePayBody)) {
        // 修改訂單狀態
    }

    res.end();
});
router.get('/cancel', function(req, res) {
    res.json('cancel');
});

module.exports = router;