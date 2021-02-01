'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSuppliers = undefined;

var _express = require('express');

var _supplier = require('../models/supplier.model');

var _supplier2 = _interopRequireDefault(_supplier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// API REST para gestión de proveedores. CRUD
// Obtener todos los proveedores -- cRud
// Express Modules
var getSuppliers = exports.getSuppliers = async function getSuppliers(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];


    try {
        var suppliers = await _supplier2.default.find();

        res.status(200).json({
            ok: true,
            suppliers: suppliers
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