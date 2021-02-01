'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var paymentMethodSchema = new _mongoose.Schema({
    user: { ref: "User", type: _mongoose.Schema.Types.ObjectId, required: false },
    name: { type: String, required: true }
}, {
    versionKey: false
});

exports.default = (0, _mongoose.model)('PaymentMethod', paymentMethodSchema);