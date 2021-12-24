const Product = require("../models/Product");
const User = require("../models/User");
const path = require("path");

module.exports.getProducts = async (req, res, next) => {
    try {        
        let products = await Product.find();
        if(!products) {
            return res.status(400).json({ message: 'No Products'});
        }

        res.status(200).json({ message: 'Success!!', data: products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports.createProduct = async (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.body.imageURL;
    const imageURL = `${image.split('\\')[0]}/${image.split('\\')[1]}`;

    try {        
        let product = await Product.findOne({ title: title });
        if(product) {
            return res.status(400).json({ message: 'Product already exists..'});
        }

        product = new Product({
            title: title, 
            price: price,
            description: description,
            image: imageURL
        });

        await product.save();

        res.status(200).json({ message: 'Success!!', data: product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports.uploadImage = async (req, res, next) => {
    const image = req.file;

    try {        
        if(!image) {
            return res.status(400).json({ message: 'Not picked images'});
        }

        res.status(200).json({ message: 'Success!!', path: req.file.path });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}
 
module.exports.getProduct = async (req, res, next) => {
    const id = req.params.id;

    try {        
        let product = await Product.findById(id);
        if(!product) {
            return res.status(400).json({ message: 'Product not found..'});
        }

        res.status(200).json({ message: 'Success!!', data: product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports.updateProduct = async (req, res, next) => {
    const id = req.params.id;
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.body.imageURL;
    const imageURL = `${image.split('\\')[0]}/${image.split('\\')[1]}`;

    try {        
        let product = await Product.findById(id);
        if(!product) {
            return res.status(400).json({ message: 'Not found..'});
        }

        product.title = title;
        product.price = price;
        product.description = description;
        product.image = imageURL;

        await product.save();

        res.status(200).json({ message: 'Success!!', data: product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports.deleteProduct = async (req, res, next) => {
    const id = req.params.id;

    try {        
        let product = await Product.findById(id);
        if(!product) {
            return res.status(400).json({ message: 'Not found..'});
        }

        await Product.findByIdAndDelete(id);

        res.status(200).json({ message: 'Success!!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports.getCart = async (req, res, next) => {
    const id = req.params.id;

    try {        
        let user = await User.findById(id).populate('cart.product_id');
        if(!user) {
            return res.status(400).json({ message: 'User not exists..'});
        }

        res.status(200).json({ message: 'Success!!', cart: user.cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports.postCartItems = async (req, res, next) => {
    const id = req.params.id;
    const product_id = req.params.product_id;

    try {        
        let user = await User.findById(id);
        if(!user) {
            return res.status(400).json({ message: 'User not exists..'});
        }

        let product = await Product.findById(product_id);
        // console.log(product);

        if(user.cart.length == 0) {
            user.cart.push({ product_id: product_id, price: product.price });
        }
        else {
            const cart = user.cart.filter((items) => { return items.product_id.toString() !== product_id.toString() });
            if(cart.length >= 0) {
                cart.push({ product_id: product_id, price: product.price });
                user.cart = cart;
            }
        }

        await user.save();

        res.status(200).json({ message: 'Success!!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports.postQtyItems = async (req, res, next) => {
    const id = req.params.id;
    const product_id = req.params.product_id;
    const quantity = req.params.qty;

    try {        
        let user = await User.findById(id).populate('cart.product_id');
        if(!user) {
            return res.status(400).json({ message: 'User not exists..'});
        }

        const cart = user.cart;
        const updatedCart = cart.map((item) => {
            if(item.product_id._id.toString() === product_id.toString()) {
                if(item.quantity == 0) {
                    item.quantity += quantity;
                    item.price = item.quantity * item.product_id.price;
                }
                else {
                    item.quantity = 0;
                    item.quantity += quantity;
                    item.price = item.quantity * item.product_id.price;
                }
                return item;
            }
            return item;
        });

        let totalPrice = 0;
        for(let product of updatedCart) {
            totalPrice += product.product_id.price * product.quantity; 
        }

        user.cart = updatedCart;

        await user.save();

        res.status(200).json({ message: 'Success!!', totalPrice: totalPrice });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports.deleteCartItems = async (req, res, next) => {
    const id = req.params.id;
    const product_id = req.params.product_id;

    try {        
        let user = await User.findById(id);
        if(!user) {
            return res.status(400).json({ message: 'User not exists..'});
        }

        const cart = user.cart.filter((items) => { return items.product_id.toString() !== product_id.toString() });

        user.cart = cart;

        await user.save();

        res.status(200).json({ message: 'Success!!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};