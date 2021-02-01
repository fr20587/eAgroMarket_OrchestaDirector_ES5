"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validationFields = undefined;

var _express = require("express");

var _expressValidator = require("express-validator");

// Express Module
var validationFields = exports.validationFields = function validationFields(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];
    var next = arguments[2];


    var errors = (0, _expressValidator.validationResult)(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.mapped()
        });
    }

    next();
};

// Express Validator Middleware Results