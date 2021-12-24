const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        let user = await User.findOne({ email: email });
        if(!user) {
            return res.status(400).json({ message: 'User not exists..', status: 400 });
        }

        if(user.role === 'admin') {
            return res.status(200).json({ message: 'Success!!', data: { user: user } })
        }

        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual) {
            return res.status(400).json({ message: 'Incorrect Password.', status: 400 });
        }

        const token = jwt.sign(
          {
            _id: user._id.toString(),
            role: user.role
          },
          "secret"
        );

        user.token = token;

        await user.save();

        res.status(200).json({ message: 'Success!!', data: { user: user } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports.postSignup = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {        
        let user = await User.findOne({ email: email });
        if(user) {
            return res.status(400).json({ message: 'User already exists..', status: 400 });
        }
        
        const hashed = await bcrypt.hash(password, 12);

        user = new User({
            name: name, 
            email: email,
            password: hashed,
            role: 'user'
        });

        await user.save();

        res.status(200).json({ message: 'Success!!', data: { user: user } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports.getUser = async (req, res, next) => {
    const id = req.params.id;

    try {
        let user = await User.findOne({ _id: id });
        if(!user) {
            return res.status(400).json({ message: 'User not exists..', status: 400});
        }

        if(user.role === 'admin') {
            return res.status(200).json({ message: 'Success!!', data: { user: user } })
        }

        res.status(200).json({ message: 'Success!!', data: { user: user } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};