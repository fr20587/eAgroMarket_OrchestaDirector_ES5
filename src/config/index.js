"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

var PORT = exports.PORT = process.env.PORT;
var MONGO_URI = exports.MONGO_URI = process.env.MONGO_URI;
var APPLICATION_NAME = exports.APPLICATION_NAME = process.env.APPLICATION_NAME;