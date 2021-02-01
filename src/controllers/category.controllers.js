"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteCategoryById = exports.updateCategoryById = exports.getCategoryById = exports.getCategories = exports.createCategory = undefined;

var _slicedToArray = function() {
    function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true;
            _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // Modules


// Models


var _express = require("express");

var _category = require("../models/category.model");

var _category2 = _interopRequireDefault(_category);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Crear nueva categoría -- Crud
var createCategory = exports.createCategory = async function createCategory(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];
    var _req$body = req.body;
    var name = _req$body.name;
    var img = _req$body.img;

    try {
        var newCategory = new _category2.default({
            name: name,
            img: img,
            user: req.userId
        });
        await newCategory.save();
        res.status(201).json({
            ok: true,
            message: 'Categoría creada correctamente',
            category: newCategory
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
};

// Obtener todos las categorias -- cRud
var getCategories = exports.getCategories = async function getCategories(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];

    var from = Number(req.query.from) || 0;
    try {
        var _ref = await Promise.all([_category2.default.find({}, 'user name img').populate('user', 'name').skip(from).limit(15), _category2.default.countDocuments()]);

        var _ref2 = _slicedToArray(_ref, 2);

        var categories = _ref2[0];
        var total = _ref2[1];

        res.status(200).json({
            ok: true,
            total: total,
            categories: categories
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
};

// Obtener una categoría -- cRud
var getCategoryById = exports.getCategoryById = async function getCategoryById(req, res) {
    var id = req.params.id;

    try {
        var category = await _category2.default.findById(id);
        res.status(200).json({
            ok: true,
            category: category
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
};

// Editar categoría -- crUd
var updateCategoryById = exports.updateCategoryById = async function updateCategoryById(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];
    var id = req.params.id;
    var _req$body2 = req.body;
    var name = _req$body2.name;
    var img = _req$body2.img;

    try {
        var newCategory = await _category2.default.findByIdAndUpdate(id, {
            name: name,
            img: img,
            user: req.userId
        }, {
            new: true
        });
        res.status(200).json({
            ok: true,
            message: 'Categoría actualizada correctamente',
            category: newCategory
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
};

// Eliminar categoría -- cruD
var deleteCategoryById = exports.deleteCategoryById = async function deleteCategoryById(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];
    var id = req.params.id;

    try {
        await _category2.default.findByIdAndDelete(id);
        res.status(200).json({
            ok: true,
            message: 'Categoría eliminada correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
};