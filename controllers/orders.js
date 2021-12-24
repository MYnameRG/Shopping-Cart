const User = require("../models/User");
const Orders = require("../models/Orders");

module.exports.getOrders = async (req, res, next) => {
    try {        
        let orders = await Orders.find();
        if(!orders) {
            return res.status(400).json({ message: 'No Orders'});
        }

        orders = orders.map((order) => {
            return {
                id: order._id,
                user_id: order.user.id,
                name: order.user.name,
                products: order.products,
                totalPrice: order.totalPrice,
                created: order.createdAt
            };
        });

        res.status(200).json({ message: 'Success!!', orders: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports.postOrders = async (req, res, next) => {
    const id = req.params.id;

    try {        
        let user = await User.findById(id).populate('cart.product_id');
        if(!user) {
            return res.status(400).json({ message: 'User not exists..'});
        }

        const cart = user.cart;
        let orders = cart.map((item) => {
            return {
                title: item.product_id.title,
                quantity: item.quantity,
                price: item.price,
                image: item.product_id.image,
                description: item.product_id.description
            };
        });

        let totalPrice = 0;
        for(let order of orders) {
            totalPrice += order.price;
        }

        orders = new Orders({
            user: {
                name: user.name,
                id: user._id
            },
            products: orders,
            totalPrice: totalPrice
        });

        await orders.save();

        user.cart = [];

        await user.save();

        res.status(200).json({ message: 'Success!!', orders: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports.getUserOrders = async (req, res, next) => {
    const id = req.params.id;

    try {        
        let orders = await Orders.find();
        if(!orders) {
            return res.status(400).json({ message: 'Orders not exists..'});
        }

        orders = orders.filter((order) => {
            if(order.user.id.toString() === id.toString()) {
                return order;
            }
        });

        orders = orders.map((order) => {
            if(order.user.id.toString() === id.toString()) {
                return {
                    id: order._id,
                    products: order.products,
                    totalPrice: order.totalPrice,
                    created: order.createdAt
                };
            }
        });

        res.status(200).json({ message: 'Success!!', orders: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports.cancelOrders = async (req, res, next) => {
    const id = req.params.id;

    try {        
        let orders = await Orders.findByIdAndDelete(id);
        if(!orders) {
            return res.status(400).json({ message: 'Orders not exists..'});
        }

        res.status(200).json({ message: 'Success!!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};