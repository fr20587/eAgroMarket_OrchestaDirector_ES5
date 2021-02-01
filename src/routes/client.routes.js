'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _client = require('../controllers/client.controllers');

var clientCtrl = _interopRequireWildcard(_client);

var _middlewares = require('../middlewares');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } }
        newObj.default = obj; return newObj; } }

// Utilizando la función Router

// Importando API clientCrtl
var router = (0, _express.Router)();

// Creando rutas para gestionar los clientes a partir de la API clientCtrl
// Crear cliente - Crud
// Los clientes nuevos se crean a partir del registro en la aplicación

// Obtener todos los clientes - cRud

// Importando middlewares
// Importando la función Router de express
router.get('/', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isAdmin], clientCtrl.getClients);

// Obtener un cliente - cRud
router.get('/:clientId', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isAdmin, _middlewares.verifyIfExist.checkIfExistClient], clientCtrl.getClientById);

// Actualizar un cliente - crUd
router.put('/:clientId', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isAdmin, _middlewares.verifyIfExist.checkIfExistClient], clientCtrl.updateClientById);

// Eliminar un cliente - cruD
router.delete('/:clientId', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isAdmin, _middlewares.verifyIfExist.checkIfExistClient], clientCtrl.deleteClientById);

// Exportando rutas de clientes
exports.default = router;