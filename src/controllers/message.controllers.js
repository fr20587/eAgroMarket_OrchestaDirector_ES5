"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getContactMessageById = exports.getContactMessage = exports.createContactMessage = undefined;

var _slicedToArray = function() {
    function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true;
            _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // Express Module


// Models


var _express = require("express");

var _message = require("../models/message.model");

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// API REST para gestión de los mensajes de contacto. CRUD
// Crear nuevo mensaje de contacto -- Crud
var createContactMessage = exports.createContactMessage = async function createContactMessage(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];
    var _req$body = req.body;
    var name = _req$body.name;
    var email = _req$body.email;
    var subject = _req$body.subject;
    var message = _req$body.message;


    var newContactMessage = new _message2.default({
        name: name,
        email: email,
        subject: subject,
        message: message
    });

    await newContactMessage.save();

    res.status(201).json({
        ok: true,
        message: 'Mensaje creado correctamente',
        newContactMessage: newContactMessage
    });
};

// Obtener todos los mensajes de contacto -- cRud
var getContactMessage = exports.getContactMessage = async function getContactMessage(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];

    var from = Number(req.query.from) || 0;

    try {
        var _ref = await Promise.all([_message2.default.find({}, 'name, email, subject, message').skip(from).limit(5), _message2.default.countDocuments()]);

        var _ref2 = _slicedToArray(_ref, 2);

        var contactMessages = _ref2[0];
        var total = _ref2[1];

        res.status(200).json({
            ok: true,
            total: total,
            contactMessages: contactMessages
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
};

// Obtener un mensaje de contacto -- cRud
var getContactMessageById = exports.getContactMessageById = async function getContactMessageById(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];
    var id = req.params.id;

    try {
        var contactMessage = await _message2.default.findById(id);
        res.status(200).json({
            ok: true,
            contactMessage: contactMessage
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
};