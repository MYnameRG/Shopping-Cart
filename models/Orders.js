const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    user: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    products: [{
        title: {
            type: 'string',
            required: true
        },
        quantity: {
            type: 'number',
            default: 0
        },
        description: {
            type: 'string',
            required: true
        },
        price: {
            type: 'number',
            required: true
        },
        image: {
            type: 'string',
            required: true
        }
    }],
    totalPrice: {
        type: 'number',
        required: true
    }
}, {
    timestamps: true
});

const Orders = mongoose.model('Orders', ordersSchema);
module.exports = Orders;