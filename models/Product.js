const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: 'string',
        required: true
    },
    price: { 
        type: 'number',
        required: true
    },
    description: {
        type: 'string',
        required: true
    },
    image: {
        type: 'string',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;