"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteCityById = exports.updateCityById = exports.getCityById = exports.getCities = exports.createCity = undefined;

var _slicedToArray = function() {
    function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true;
            _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // Modules


// Models


var _express = require("express");

var _city = require("../models/city.model");

var _city2 = _interopRequireDefault(_city);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Crear nuevo minicipio -- Crud
var createCity = exports.createCity = async function createCity(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];
    var _req$body = req.body;
    var name = _req$body.name;
    var cost = _req$body.cost;

    try {
        var newCity = new _city2.default({
            name: name,
            cost: cost,
            user: req.userId
        });
        await newCity.save();
        res.status(201).json({
            ok: true,
            message: 'Municipio creado correctamente',
            city: newCity
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
};

// Obtener todos los municipios -- cRud
var getCities = exports.getCities = async function getCities(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];

    var from = Number(req.query.from) || 0;
    try {
        var _ref = await Promise.all([_city2.default.find({}, 'user name cost').populate('user', 'name'), _city2.default.countDocuments()]);

        var _ref2 = _slicedToArray(_ref, 2);

        var cities = _ref2[0];
        var total = _ref2[1];

        res.status(200).json({
            ok: true,
            total: total,
            cities: cities
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
};

// Obtener un municipio -- cRud
var getCityById = exports.getCityById = async function getCityById(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];
    var id = req.params.id;

    try {
        var city = await _city2.default.findById(id);
        res.status(200).json({
            ok: true,
            city: city
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
};

// Editar municipio -- crUd
var updateCityById = exports.updateCityById = async function updateCityById(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];
    var id = req.params.id;
    var _req$body2 = req.body;
    var name = _req$body2.name;
    var cost = _req$body2.cost;

    try {
        var newCity = await _city2.default.findByIdAndUpdate(id, {
            name: name,
            cost: cost,
            user: req.userId
        }, {
            new: true
        });
        res.status(200).json({
            ok: true,
            message: 'Municipio actualizado correctamente',
            city: newCity
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
};

// Eliminar municipio -- cruD
var deleteCityById = exports.deleteCityById = async function deleteCityById(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];
    var id = req.params.id;

    try {
        await _city2.default.findByIdAndDelete(id);
        res.status(200).json({
            ok: true,
            message: 'Municipio eliminado correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
};