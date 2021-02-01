'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getBrands = undefined;

var _express = require('express');

var _brand = require('../models/brand.model');

var _brand2 = _interopRequireDefault(_brand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// API REST para gestión de marcas. CRUD
// Obtener todas los marcas -- cRud
// Express Modules
var getBrands = exports.getBrands = async function getBrands(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];


    try {
        var brands = await _brand2.default.find();

        res.status(200).json({
            ok: true,
            brands: brands
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