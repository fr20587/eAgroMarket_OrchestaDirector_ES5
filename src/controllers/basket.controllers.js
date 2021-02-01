'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getBasketById = exports.getBasket = exports.addItemToBasket = exports.createBasket = undefined;

var _basket = require('../models/basket.model');

var _basket2 = _interopRequireDefault(_basket);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// API REST para gestión de la cesta. CRUD
// Crear nueva cesta -- Crud
var createBasket = exports.createBasket = async function createBasket(req, res) {
    var _req$body = req.body;
    var _id = _req$body._id;
    var items = _req$body.items;


    var newBasket = new _basket2.default({
        _id: _id,
        items: items
    });

    await newBasket.save();
    return res.status(201).json(newBasket);
};

// Agregar producto a la cesta -- Crud
var addItemToBasket = exports.addItemToBasket = async function addItemToBasket(req, res) {
    var _req$body2 = req.body;
    var _id = _req$body2._id;
    var items = _req$body2.items;


    try {
        var basket = await _basket2.default.findOne({ _id: _id });

        if (basket) {
            var itemIndex = basket.items.findIndex(function(i) {
                return i.productId === items.productId;
            });
            // let item = basket.items.find(p => p._id === items._id);

            if (itemIndex > -1) {
                var productItem = basket.items[itemIndex];
                productItem.quantity++;
                basket.items[itemIndex] = productItem;
            } else {
                console.log(items);
                basket.items.push({ items: items });
            }

            basket = await basket.save();
            return res.status(201).json(basket);
        } else {
            var newBasket = await _basket2.default.create({
                _id: _id,
                items: items
            });
            return res.status(201).json(newBasket);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Algo salió mal'
        });
    }
};

// Obtener todas cestas -- cRud
var getBasket = exports.getBasket = async function getBasket(req, res) {};

// Obtener cesta por cliente -- cRud
var getBasketById = exports.getBasketById = async function getBasketById(req, res) {
    var basketId = req.params.basketId;


    var basket = await _basket2.default.findById(basketId);

    return res.status(200).json(basket);
};