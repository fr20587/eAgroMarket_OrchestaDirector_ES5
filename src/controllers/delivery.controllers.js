'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteDeliveryCostById = exports.updateDeliveryCostById = exports.getDeliveryCostById = exports.getDeliveryCost = exports.createDevliveryCost = undefined;

var _delivery = require('../models/delivery.model');

var _delivery2 = _interopRequireDefault(_delivery);

var _city = require('../models/city.model');

var _city2 = _interopRequireDefault(_city);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// API REST para gestión de los costos de entrega por municipios. CRUD
// Crear nuevo costo de entrega -- Crud
var createDevliveryCost = exports.createDevliveryCost = async function createDevliveryCost(req, res) {
    var _req$body = req.body;
    var city = _req$body.city;
    var cost = _req$body.cost;


    var newCity = new _delivery2.default({
        city: city,
        cost: cost
    });

    // Relacionando municipio con el Costo de Entrega
    var foundCity = await _city2.default.find({ name: { $in: city } });
    newDeliveryCost.cityId = foundCity.map(function(city) {
        return city._id;
    });

    await newCity.save();

    res.status(201).json({ message: 'Costo de Entrega creado correctamente' });
};

// Obtener todos los Costos de Entrega -- cRud
var getDeliveryCost = exports.getDeliveryCost = async function getDeliveryCost(req, res) {
    var delivery = await _delivery2.default.find().populate('cityId', 'city');
    res.status(200).json(delivery);
};

// Obtener un Costo de Entrega -- cRud
var getDeliveryCostById = exports.getDeliveryCostById = async function getDeliveryCostById(req, res) {
    var deliveryCostId = req.params.deliveryCostId;

    var delivery = await _delivery2.default.findById(deliveryCostId);
    res.status(200).json(delivery);
};

// Editar Costo de Entrega -- crUd
var updateDeliveryCostById = exports.updateDeliveryCostById = async function updateDeliveryCostById(req, res) {
    var deliveryCostId = req.params.deliveryCostId;
    var cost = req.body.cost;

    await _delivery2.default.findByIdAndUpdate(deliveryCostId, { cost: cost }, {
        new: true
    });
    res.status(200).json({ messages: 'Costo de Entrega actualizado correctamente' });
};

// Eliminar Costo de Entrega -- cruD
var deleteDeliveryCostById = exports.deleteDeliveryCostById = async function deleteDeliveryCostById(req, res) {
    var deliveryCostId = req.params.deliveryCostId;

    await _delivery2.default.findByIdAndDelete(deliveryCostId);
    res.status(200).json({ messages: 'Costo de Entrega eliminado correctamente' });
};