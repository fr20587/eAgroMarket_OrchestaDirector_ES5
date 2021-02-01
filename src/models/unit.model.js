'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var unitSchema = new _mongoose.Schema({
    user: { type: _mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    initial: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
}); // Mongoose Modules


unitSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'unit'
});

exports.default = (0, _mongoose.model)('Unit', unitSchema);