'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var categorySchema = new _mongoose.Schema({
    user: { type: _mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    img: { type: String }
}, {
    versionKey: false
}); // Mongoose Modules


categorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category'
});

exports.default = (0, _mongoose.model)('Category', categorySchema);