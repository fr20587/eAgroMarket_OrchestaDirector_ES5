'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var citySchema = new _mongoose.Schema({
    user: { ref: "User", type: _mongoose.Schema.Types.ObjectId },
    name: { type: String },
    cost: { type: Number }
}, {
    versionKey: false
});

exports.default = (0, _mongoose.model)('City', citySchema);