const express = require('express');
const { getProducts, createProduct, getProduct, updateProduct, deleteProduct, uploadImage, getCart, postCartItems, postQtyItems, deleteCartItems } = require('../controllers/products');
const { check } = require('express-validator/check')
const router = express.Router();

router.get('/', getProducts);

router.post('/',[
    check('title', 'Please enter the title').not().isEmpty(),
    check('price', 'Please enter the price').not().isEmpty(),
    check('description', 'Please enter the description').not().isEmpty()
], createProduct);

router.post('/images', uploadImage);

router.get('/:id', getProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

router.get('/cart/:id', getCart);

router.post('/cart/:id/:product_id', postCartItems);

router.post('/cart/:id/:product_id/:qty', postQtyItems);

router.delete('/cart/:id/:product_id', deleteCartItems);

module.exports = router;