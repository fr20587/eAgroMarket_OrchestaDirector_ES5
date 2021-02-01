"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteUnitById = exports.updateUnitById = exports.getUnitById = exports.getUnits = exports.createUnit = undefined;

var _slicedToArray = function() {
    function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true;
            _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // Modules


// Models


var _express = require("express");

var _unit = require("../models/unit.model");

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Crear nueva unidad de medida -- Crud
var createUnit = exports.createUnit = async function createUnit(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];
    var _req$body = req.body;
    var name = _req$body.name;
    var initial = _req$body.initial;

    try {
        var newUnit = new _unit2.default({
            name: name,
            initial: initial,
            user: req.userId
        });
        await newUnit.save();
        res.status(201).json({
            ok: true,
            message: 'Unidad de medida creada correctamente',
            unit: newUnit
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
};

// Obtener todos las unidades de medida -- cRud
var getUnits = exports.getUnits = async function getUnits(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];

    var from = Number(req.query.from) || 0;
    try {
        var _ref = await Promise.all([_unit2.default.find({}, 'user name initial').skip(from).limit(15), _unit2.default.countDocuments()]);

        var _ref2 = _slicedToArray(_ref, 2);

        var units = _ref2[0];
        var total = _ref2[1];

        res.status(200).json({
            ok: true,
            total: total,
            units: units
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
};

// Obtener una unidad de medida -- cRud
var getUnitById = exports.getUnitById = async function getUnitById(req, res) {
    var id = req.params.id;

    try {
        var unit = await _unit2.default.findById(id);
        res.status(200).json({
            ok: true,
            unit: unit
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
};

// Editar unidad de medida -- crUd
var updateUnitById = exports.updateUnitById = async function updateUnitById(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];
    var id = req.params.id;
    var _req$body2 = req.body;
    var name = _req$body2.name;
    var initial = _req$body2.initial;

    try {
        var newUnit = await _unit2.default.findByIdAndUpdate(id, {
            name: name,
            initial: initial,
            user: req.userId
        }, {
            new: true
        });
        res.status(200).json({
            ok: true,
            message: 'Unidad de medida actualizada correctamente',
            unit: newUnit
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
};

// Eliminar unidad de medida -- cruD
var deleteUnitById = exports.deleteUnitById = async function deleteUnitById(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];
    var id = req.params.id;

    try {
        await _unit2.default.findByIdAndDelete(id);
        res.status(200).json({
            ok: true,
            message: 'Unidad de medida eliminada correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
};