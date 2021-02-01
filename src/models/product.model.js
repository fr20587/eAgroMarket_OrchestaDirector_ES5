'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

// Estructura (schema) de los "Documentos" Productos en la DB
var productSchema = new _mongoose.Schema({
    user: { ref: 'User', type: _mongoose.Schema.Types.ObjectId, required: false },

    name: { type: String, required: false },
    shortDetails: { type: String },
    description: { type: String },
    img: { type: String },
    imageUrl: { type: String },

    stock: { type: Number, required: false },
    cost: { type: Number, required: false },
    price: { type: Number, required: false },
    discount: { type: Number },
    rate: { type: Number, min: 0, max: 5 },

    onSale: { type: Boolean, required: false },
    newItem: { type: Boolean },
    newSupplier: { type: Boolean },

    category: { ref: 'Category', type: _mongoose.Schema.Types.ObjectId },
    brand: { ref: 'Brand', type: _mongoose.Schema.Types.ObjectId },
    supplier: { ref: 'Supplier', type: _mongoose.Schema.Types.ObjectId },
    unit: { type: String },

    ingredients: [{ ref: 'Ingredient', type: _mongoose.Schema.Types.ObjectId }]
}, {
    timestamps: true,
    versionKey: false
}); // Mongoose Modules


productSchema.virtual('categoryRef', {
    ref: 'Category',
    localField: 'category',
    foreignField: '_id'
});

exports.default = (0, _mongoose.model)('Product', productSchema);