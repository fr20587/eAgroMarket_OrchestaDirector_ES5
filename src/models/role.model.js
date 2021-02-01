"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ROLES = undefined;

var _mongoose = require("mongoose");

var ROLES = exports.ROLES = ["user", "admin", "moderator"];

var roleSchema = new _mongoose.Schema({
    name: String
}, {
    versionKey: false
});

exports.default = (0, _mongoose.model)('Role', roleSchema);