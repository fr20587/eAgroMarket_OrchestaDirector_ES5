'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _expressValidator = require('express-validator');

var _order = require('../controllers/order.controllers');

var orderCtrl = _interopRequireWildcard(_order);

var _middlewares = require('../middlewares');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } }
        newObj.default = obj; return newObj; } }

/* 
    Ordenes
    path: 'api/order'
*/

// Utilizando la función Router


// Controller
// Express Modules
var router = (0, _express.Router)();

// Crear orden -- Crud


// Middlewares
router.post('/', [_middlewares.authJwt.verifyClientToken], orderCtrl.createOrder);

// Obtener todas las órdenes -- cRud
router.get('/', [], orderCtrl.getOrders);

// Obtener órdenes por cliente
router.get('/', [_middlewares.authJwt.verifyClientToken], orderCtrl.getOrdersByClient);

// Actualizar órden -- crUd
router.put('/', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isModerator], orderCtrl.updateOrderById);

// Eliminiar orden -- cruD
router.delete('/', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isAdmin], orderCtrl.deleteOrderById);

// Exportando rutas de categorías
exports.default = router;