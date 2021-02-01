'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var deliverySchema = new _mongoose.Schema({
    user: { ref: "User", type: _mongoose.Schema.Types.ObjectId, required: false },
    city: { ref: 'City', type: _mongoose.Schema.Types.ObjectId, autopopulate: true },
    cost: { type: Number, required: true }
}, {
    timestamps: true,
    versionKey: false
});

// deliverySchema.plugin(require('mongoose-autopopulate'));
exports.default = (0, _mongoose.model)('Delivery', deliverySchema);