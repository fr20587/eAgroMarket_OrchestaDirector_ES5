'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteIngredientById = exports.updateIngredientById = exports.getIngredientById = exports.getIngredients = exports.createIngredient = undefined;

var _ingredients = require('../models/ingredients.model');

var _ingredients2 = _interopRequireDefault(_ingredients);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// API REST para gestión de ingredientes. CRUD
// Crear nuevo ingrediente -- Crud
var createIngredient = exports.createIngredient = async function createIngredient(req, res) {
    // Ubicando el token del usuario
    var token = req.headers['Authorization'];

    var decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET_KEY_T_USER);
    req.userId = decoded.id;

    // Definiendo datos a recibir
    var name = req.body.name;


    var newIngredient = new _ingredients2.default({
        name: name,
        userId: req.userId
    });

    // Guardando ingrediente en la DB
    await newIngredient.save();

    // Mensaje de confirmación
    res.status(201).json({ message: 'Ingrediente creado correctamente' });
};

// Obtener todos los ingredientes -- cRud
var getIngredients = exports.getIngredients = async function getIngredients(req, res) {
    var _req$query = req.query;
    var pageSize = _req$query.pageSize;
    var pageNum = _req$query.pageNum;


    var ingredients = await _ingredients2.default.find().skip(pageSize * pageNum - pageSize).limit(pageSize);

    res.json(ingredients);
};

// Obtener un ingrediente -- cRud
var getIngredientById = exports.getIngredientById = async function getIngredientById(req, res) {
    var ingredientId = req.params.ingredientId;

    var ingredient = await _ingredients2.default.findById(ingredientId);
    res.status(200).json(ingredient);
};

// Editar ingrediente -- crUd
var updateIngredientById = exports.updateIngredientById = async function updateIngredientById(req, res) {
    // Ubicando el token del usuario
    var token = req.headers['Authorization'];

    var decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET_KEY_T_USER);
    req.userId = decoded.id;

    var ingredientId = req.params.ingredientId;
    var name = req.body.name;

    await _ingredients2.default.findByIdAndUpdate(ingredientId, {
        name: name,
        userId: req.userId
    }, {
        new: true
    });
    res.status(200).json({ messages: 'Ingrediente actualizado correctamente' });
};

// Eliminar ingrediente -- cruD
var deleteIngredientById = exports.deleteIngredientById = async function deleteIngredientById(req, res) {
    var ingredientId = req.params.ingredientId;

    await _ingredients2.default.findByIdAndDelete(ingredientId);
    res.status(200).json({ messages: 'Ingrediente eliminado correctamente' });
};