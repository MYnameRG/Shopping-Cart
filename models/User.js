const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: 'string',
        required: true
    },
    role: { 
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    },
    token: {
        type: 'string',
        default: null
    },
    cart: [{
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: 'number',
            default: 1
        },
        price: {
            type: 'number'
        }
    }]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;