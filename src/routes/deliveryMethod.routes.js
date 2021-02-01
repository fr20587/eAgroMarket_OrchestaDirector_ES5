'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _deliveryMethod = require('../controllers/deliveryMethod.controllers');

var deliveryMethodCtrl = _interopRequireWildcard(_deliveryMethod);

var _middlewares = require('../middlewares');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } }
        newObj.default = obj; return newObj; } }

// Utilizando la función Router

// Importando API deliveryCtrl
var router = (0, _express.Router)();

// Creando rutas para gestionar los Costos de Entrega a partir de la API deliveryCtrl
// Crear Costo de Entrega -- Crud

// Importando middlewares
// Importando la función Router de express
router.post('/', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isModerator], deliveryMethodCtrl.createDevliveryMethod);

// Obtener Costos de Entrega -- cRud
router.get('/', [_middlewares.parseQuery.parseIntMiddleware], deliveryMethodCtrl.getDeliveryMethod);

// Obtener un Costo de Entrega -- cRud
router.get('/:deliveryMethodId', [_middlewares.verifyIfExist.checkIfExistDeliveryMethod], deliveryMethodCtrl.getDeliveryMethodById);

// Actualizar un Costo de Entrega -- crUd
router.put('/:deliveryMethodId', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isModerator, _middlewares.verifyIfExist.checkIfExistDeliveryMethod], deliveryMethodCtrl.updateDeliveryMethodById);

// Eliminar un Costo de Entrega -- cruD
router.delete('/:deliveryMethodId', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isAdmin, _middlewares.verifyIfExist.checkIfExistDeliveryMethod], deliveryMethodCtrl.deleteDeliveryMethodById);

// Exportando rutas de categorías
exports.default = router;