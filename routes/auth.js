const express = require('express');
const { check } = require('express-validator/check')
const { postLogin, postSignup, getUser } = require('../controllers/auth');
const router = express.Router();

router.get('/:id', getUser);

router.post('/login',[
    check('email', 'Please enter your valid email address').isEmail(),
    check('password', 'Please enter your password of minimum 5 characters').trim().isLength({ min: 5 })
], postLogin);

router.post('/signup',[
    check('name', 'Please enter your name').not().isEmpty().isAlpha(),
    check('email', 'Please enter your valid email address').isEmail(),
    check('password', 'Please enter your password of minimum 5 characters').trim().isLength({ min: 5 })
], postSignup);

module.exports = router;