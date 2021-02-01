'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteDeliveryMethodById = exports.updateDeliveryMethodById = exports.getDeliveryMethodById = exports.getDeliveryMethod = exports.createDevliveryMethod = undefined;

var _deliveryMethod = require('../models/deliveryMethod.model');

var _deliveryMethod2 = _interopRequireDefault(_deliveryMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// API REST para gestión de los Métodos de Entrega. CRUD
// Crear nuevo Método de Entrega -- Crud
var createDevliveryMethod = exports.createDevliveryMethod = async function createDevliveryMethod(req, res) {
    var name = req.body.name;

    var newDeliveryMethod = new _deliveryMethod2.default({ name: name });
    await newDeliveryMethod.save();
    res.status(201).json({ message: 'Método de Entrega creado correctamente' });
};

// Obtener todos los Métodos de Entrega -- cRud
var getDeliveryMethod = exports.getDeliveryMethod = async function getDeliveryMethod(req, res) {
    var deliveryMethod = await _deliveryMethod2.default.find();
    res.status(200).json(deliveryMethod);
};

// Obtener un Método de Entrega -- cRud
var getDeliveryMethodById = exports.getDeliveryMethodById = async function getDeliveryMethodById(req, res) {
    var deliveryMethodId = req.params.deliveryMethodId;

    var deliveryMethod = await _deliveryMethod2.default.findById(deliveryMethodId);
    res.status(200).json(deliveryMethod);
};

// Editar Método de Entrega -- crUd
var updateDeliveryMethodById = exports.updateDeliveryMethodById = async function updateDeliveryMethodById(req, res) {
    var deliveryMethodId = req.params.deliveryMethodId;
    var name = req.body.name;

    await _deliveryMethod2.default.findByIdAndUpdate(deliveryMethodId, { name: name }, {
        new: true
    });
    res.status(200).json({ messages: 'Método de Entrega actualizado correctamente' });
};

// Eliminar Método de Entrega -- cruD
var deleteDeliveryMethodById = exports.deleteDeliveryMethodById = async function deleteDeliveryMethodById(req, res) {
    var deliveryMethodId = req.params.deliveryMethodId;

    await _deliveryMethod2.default.findByIdAndDelete(deliveryMethodId);
    res.status(200).json({ messages: 'Método de Entrega eliminado correctamente' });
};