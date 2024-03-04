const express = require('express');
const router = express.Router();


router.get('/confirm', function(req, res) {
    const { transactionId, orderId } = req.query;

    res.end();
});
router.get('/cancel', function(req, res) {
    res.json('cancel');
});

module.exports = router;