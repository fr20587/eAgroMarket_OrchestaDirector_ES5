'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var orderSchema = new _mongoose.Schema({
    client: { type: _mongoose.Schema.Types.ObjectId, ref: 'Client' },

    name: { type: String },
    lastName: { type: String },
    phone: { type: String },
    email: { type: String },

    city: { type: String },
    street1: { type: String },
    street2: { type: String },
    town: { type: String },
    obs: { type: String },

    products: [{
        product: { type: Object },
        // name: { type: String, required: false },
        // price: { type: Number, required: false },
        // unit: { type: String, required: false },
        quantity: { type: Number }
    }],

    paymentWay: { type: String },

    subtotal: { type: Number },
    shipping: { type: Number },
    total: { type: Number }

}, {
    versionKey: false,
    timestamps: true
}); // Mongoose Modules


orderSchema.virtual('productRef', {
    ref: 'Product',
    localField: 'productId',
    foreignField: '_id'
});

exports.default = (0, _mongoose.model)('Order', orderSchema);