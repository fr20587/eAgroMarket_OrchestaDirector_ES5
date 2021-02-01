'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkIfExistDeliveryMethod = exports.checkIfExistDeliveryCost = exports.checkIfExistOrder = exports.checkIfExistIngredient = exports.checkIfExistCategory = exports.checkIfExistProduct = exports.checkIfExistClient = exports.checkIfExistUser = undefined;

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _client = require('../models/client.model');

var _client2 = _interopRequireDefault(_client);

var _product = require('../models/product.model');

var _product2 = _interopRequireDefault(_product);

var _order = require('../models/order.model');

var _order2 = _interopRequireDefault(_order);

var _category = require('../models/category.model');

var _category2 = _interopRequireDefault(_category);

var _ingredients = require('../models/ingredients.model');

var _ingredients2 = _interopRequireDefault(_ingredients);

var _delivery = require('../models/delivery.model');

var _delivery2 = _interopRequireDefault(_delivery);

var _deliveryMethod = require('../models/deliveryMethod.model');

var _deliveryMethod2 = _interopRequireDefault(_deliveryMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Verificar si existe...
// Para usuarios
var checkIfExistUser = exports.checkIfExistUser = async function checkIfExistUser(req, res, next) {
    // Definiendo id del usuario
    var userId = req.params.userId;

    // Comprobar si el usuario existe

    var foundUser = await _user2.default.findById(userId);
    if (!foundUser) return res.status(400).json({ message: 'Usuario no válido' });

    next();
};

// Para clientes
var checkIfExistClient = exports.checkIfExistClient = async function checkIfExistClient(req, res, next) {
    // Definiendo id del cliente
    var clientId = req.params.clientId;

    // Comprobar si el cliente existe

    var foundClient = await _client2.default.findById(clientId);
    if (!foundClient) return res.status(400).json({ message: 'Cliente no válido' });

    next();
};

// Para productos
var checkIfExistProduct = exports.checkIfExistProduct = async function checkIfExistProduct(req, res, next) {
    // Definiendo id del producto
    var id = req.params.id;

    // Comprobar si existe el producto

    var foundProduct = await _product2.default.findById(id);
    if (!foundProduct) return res.status(400).json({
        ok: false,
        message: 'Producto no válido'
    });

    next();
};

// Para categorias
var checkIfExistCategory = exports.checkIfExistCategory = async function checkIfExistCategory(req, res, next) {
    var categoryId = req.params.categoryId;

    var foundCategory = await _category2.default.findById(categoryId);
    if (!foundCategory) return res.status(400).json({
        ok: false,
        message: 'Categoría no válida'
    });
    next();
};

// Para ingredientes
var checkIfExistIngredient = exports.checkIfExistIngredient = async function checkIfExistIngredient(req, res, next) {
    var ingredientsId = req.params.ingredientsId;

    var foundIngredient = await _ingredients2.default.findById(ingredientsId);
    if (!foundIngredient) return res.status(400).json({
        ok: false,
        message: 'Ingrediente no válido'
    });
    next();
};

// Para órdenes
var checkIfExistOrder = exports.checkIfExistOrder = async function checkIfExistOrder(req, res, next) {
    // Definiendo id de la orden
    var orderId = req.params.orderId;

    // Comprobar si la orden existe

    var foundOrder = await _order2.default.findById(orderId);
    if (!foundOrder) return res.status(400).json({ message: 'Orden no válida' });

    next();
};

// Para Costos de Entrega
var checkIfExistDeliveryCost = exports.checkIfExistDeliveryCost = async function checkIfExistDeliveryCost(req, res, next) {
    // Definiendo id del Costo de Entrega
    var deliveryCostId = req.params.deliveryCostId;

    // Comprobar si el Costo de Entrega existe

    var foundDeliveryCost = await _delivery2.default.findById(deliveryCostId);
    if (!foundDeliveryCost) {
        return res.status(400).json({ message: 'Costo de Entrega no válido' });
    };

    next();
};

// Para Métodos de Entrega
var checkIfExistDeliveryMethod = exports.checkIfExistDeliveryMethod = async function checkIfExistDeliveryMethod(req, res, next) {
    // Definiendo id del Costo de Entrega
    var deliveryMethodId = req.params.deliveryMethodId;

    // Comprobar si el Costo de Entrega existe

    var foundDeliveryMethod = await _deliveryMethod2.default.findById(deliveryMethodId);
    if (!foundDeliveryMethod) {
        return res.status(400).json({ message: 'Método de Entrega no válido' });
    };

    next();
};