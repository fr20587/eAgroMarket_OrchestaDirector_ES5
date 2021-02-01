'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRoles = undefined;

var _express = require('express');

var _role = require('../models/role.model');

var _role2 = _interopRequireDefault(_role);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// API REST para gestión de roles. CRUD
// Obtener todos los roles -- cRud
// Express Modules
var getRoles = exports.getRoles = async function getRoles(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];


    try {
        var roles = await _role2.default.find();

        res.status(200).json({
            ok: true,
            roles: roles
        });;
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            messages: 'Error inesperado.'
        });
    }
};

// Models