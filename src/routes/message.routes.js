'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _message = require('../controllers/message.controllers');

var messageCtrl = _interopRequireWildcard(_message);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } }
        newObj.default = obj; return newObj; } }

// Utilizando la función Router
// Importando la función Router de express
var router = (0, _express.Router)();

// Creando rutas para gestionar los categorías a partir de la API messageCtrl
// Crear mensaje de contacto -- Crud

// Importando API messageCtrl
router.post('/', messageCtrl.createContactMessage);

// Obtener mensajes de contacto -- cRud
router.get('/', messageCtrl.getContactMessage);

// Obtener un mensaje de contacto -- cRud
router.get('/:id', messageCtrl.getContactMessageById);

// Exportando rutas de categorías
exports.default = router;