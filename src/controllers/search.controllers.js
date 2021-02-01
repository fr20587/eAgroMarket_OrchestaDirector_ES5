'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getColectionDocument = exports.getAll = undefined;

var _slicedToArray = function() {
    function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true;
            _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // Express Modules


// Models


var _express = require('express');

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _category = require('../models/category.model');

var _category2 = _interopRequireDefault(_category);

var _product = require('../models/product.model');

var _product2 = _interopRequireDefault(_product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Buscar en todas las colecciónes -- cRud
var getAll = exports.getAll = async function getAll(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];
    var search = req.params.search;


    try {
        var regex = new RegExp(search, 'i');

        var _ref = await Promise.all([_user2.default.find({ name: regex }), _category2.default.find({ name: regex }), _product2.default.find({ name: regex })]);

        var _ref2 = _slicedToArray(_ref, 3);

        var user = _ref2[0];
        var category = _ref2[1];
        var product = _ref2[2];


        res.json({
            message: 'getAll',
            user: user,
            category: category,
            product: product
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'No se ha podido realizar la petición de búsqueda.'
        });
    }
};

// Buscar en una colección específica -- cRud
var getColectionDocument = exports.getColectionDocument = async function getColectionDocument(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];
    var _req$params = req.params;
    var search = _req$params.search;
    var document = _req$params.document;

    var regex = new RegExp(search, 'i');
    var data = [];

    try {
        switch (document) {
            case 'products':
                data = await _product2.default.find({ name: regex }).populate('categoryId', 'name img').populate('brandId', 'name img').populate('supplierId', 'name img').populate('ingredientId', 'name img').populate('tagsId', 'name').populate('colorsId', 'name').populate('userId', 'name img');
                break;
            case 'categories':
                data = await _category2.default.find({ name: regex }).populate('userId', 'name img');
                break;
            case 'users':
                data = await _user2.default.find({ name: regex }).populate('userId', 'name img').populate('roles', 'name');
                break;
            default:
                return res.status(400).json({
                    messages: 'La colección debe ser : Productos, Categorías, o Usuarios'
                });

        }

        res.json({
            results: data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'No se ha podido realizar la petición de búsqueda.'
        });
    }
};