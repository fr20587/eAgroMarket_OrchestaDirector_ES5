'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var messageSchema = new _mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false
});

exports.default = (0, _mongoose.model)('Message', messageSchema);