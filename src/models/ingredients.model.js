'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var ingredientSchema = new _mongoose.Schema({
    user: { ref: "User", type: _mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    img: { type: String }
}, {
    versionKey: false
});

exports.default = (0, _mongoose.model)('Ingredient', ingredientSchema);