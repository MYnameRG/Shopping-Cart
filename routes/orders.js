const express = require('express');
const { getOrders, postOrders, getUserOrders, cancelOrders } = require('../controllers/orders');
const router = express.Router();

router.get('/', getOrders);

router.get('/:id', getUserOrders);

router.post('/:id', postOrders);

router.delete('/:id', cancelOrders);

module.exports = router;