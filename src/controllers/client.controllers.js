'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteClientById = exports.updateClientById = exports.getClientById = exports.getClients = undefined;

var _slicedToArray = function() {
    function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true;
            _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // Express Modules


// Models


var _express = require('express');

var _client = require('../models/client.model');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// API REST para gestión de clientes. CRUD
// Crear nuevo cliente -- Crud
// Los clientes nuevos se crean a partir del registro en la aplicación

// Obtener todos los clientes -- cRud
var getClients = exports.getClients = async function getClients(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];

    var from = Number(req.query.from) || 0;

    var _ref = await Promise.all([_client2.default.find({}, 'name lastName email roles phone img gender birthday address street1 street2 city state postalCode info').skip(from).limit(5), _client2.default.countDocuments()]);

    var _ref2 = _slicedToArray(_ref, 2);

    var clients = _ref2[0];
    var total = _ref2[1];


    res.status(200).json({
        ok: true,
        total: total,
        clients: clients
    });
};

// Obtener un cliente -- cRud
var getClientById = exports.getClientById = async function getClientById(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];
    var clientId = req.params.clientId;

    var client = await _client2.default.findById(clientId);
    res.status(200).json({
        ok: true,
        client: client
    });
};

// Editar cliente -- crUd
var updateClientById = exports.updateClientById = async function updateClientById(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];
    var clientId = req.params.clientId;
    var _req$body = req.body;
    var name = _req$body.name;
    var email = _req$body.email;


    await _client2.default.findByIdAndUpdate(clientId, {
        name: name,
        email: email
    }, {
        new: true
    });
    res.status(200).json({
        ok: true,
        message: 'Datos del cliente actualizado correctamente'
    });
};

// Eliminar cliente -- cruD
var deleteClientById = exports.deleteClientById = async function deleteClientById(req, res) {
    var clientId = req.params.clientId;

    await _client2.default.findByIdAndDelete(clientId);
    res.status(200).json({
        ok: true,
        message: 'Cliente eliminado correctamente'
    });
};