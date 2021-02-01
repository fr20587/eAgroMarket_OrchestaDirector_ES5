"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteOrderById = exports.updateOrderById = exports.getOrdersByClient = exports.getOrders = exports.createOrder = undefined;

var _slicedToArray = function() {
    function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true;
            _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // Modules


// Models


var _express = require("express");

var _order = require("../models/order.model");

var _order2 = _interopRequireDefault(_order);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Crear orden -- Crud
var createOrder = exports.createOrder = async function createOrder(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];
    var _req$body = req.body;
    var name = _req$body.name;
    var lastName = _req$body.lastName;
    var phone = _req$body.phone;
    var email = _req$body.email;
    var city = _req$body.city;
    var street1 = _req$body.street1;
    var street2 = _req$body.street2;
    var town = _req$body.town;
    var obs = _req$body.obs;
    var products = _req$body.products;
    var paymentWay = _req$body.paymentWay;
    var subtotal = _req$body.subtotal;
    var shipping = _req$body.shipping;
    var total = _req$body.total;


    try {
        var newOrder = new _order2.default({
            client: req.clientId,

            name: name,
            lastName: lastName,
            phone: phone,
            email: email,

            city: city,
            street1: street1,
            street2: street2,
            town: town,
            obs: obs,

            products: products,

            paymentWay: paymentWay,

            subtotal: subtotal,
            shipping: shipping,
            total: total
        });
        await newOrder.save();
        res.status(201).json({
            ok: true,
            message: 'Orden creada correctamente',
            order: newOrder
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
};

// Obtener todas las órdenes -- cRud
var getOrders = exports.getOrders = async function getOrders(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];

    var from = Number(req.query.from) || 0;
    try {
        var _ref = await Promise.all([_order2.default.find({}).populate('client', 'name lastName').populate('product', 'name price unit').skip(from).limit(15), _order2.default.countDocuments()]);

        var _ref2 = _slicedToArray(_ref, 2);

        var orders = _ref2[0];
        var total = _ref2[1];

        res.status(200).json({
            ok: true,
            total: total,
            orders: orders
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
};

// Obetner órdenes por cliente -- cRud
var getOrdersByClient = exports.getOrdersByClient = async function getOrdersByClient(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];

    var from = Number(req.query.from) || 0;
    try {
        var _ref3 = await Promise.all([_order2.default.find({ clientId: req.clientId }).populate('client', 'name lastName').populate('products', 'name price unit').skip(from).limit(15), _order2.default.countDocuments()]);

        var _ref4 = _slicedToArray(_ref3, 2);

        var orders = _ref4[0];
        var total = _ref4[1];

        res.status(200).json({
            ok: true,
            total: total,
            orders: orders
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
};

// Actualizar órden -- crUd
var updateOrderById = exports.updateOrderById = async function updateOrderById(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];
    var id = req.params.id;
    var status = req.body.status;

    try {
        var newOrder = await _order2.default.findByIdAndUpdate(id, {
            status: status,
            user: req.userId
        }, {
            new: true
        });
        res.status(200).json({
            ok: true,
            message: 'Orden actualizada correctamente',
            order: newOrder
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
};

// Eliminar orden -- cruD
var deleteOrderById = exports.deleteOrderById = async function deleteOrderById(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];
    var id = req.params.id;

    try {
        await _order2.default.findByIdAndDelete(id);
        res.status(200).json({
            ok: true,
            message: 'Orden eliminada correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
};