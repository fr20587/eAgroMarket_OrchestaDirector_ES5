"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var basketSchema = new _mongoose.Schema({
    _id: { type: String, required: true },
    items: [{
        product: { ref: "Product", type: _mongoose.Schema.Types.ObjectId, required: true },
        quantity: { type: Number, required: false }
    }]
}, {
    timestamps: true,
    versionKey: false
});

exports.default = (0, _mongoose.model)("Basket", basketSchema);