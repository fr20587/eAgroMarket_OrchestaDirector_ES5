'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _basket = require('../controllers/basket.controllers');

var basketCtrl = _interopRequireWildcard(_basket);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } }
        newObj.default = obj; return newObj; } }

// Utilizando la función Router
// Importando la función Router de express
var router = (0, _express.Router)();

// Creando rutas para gestionar la cesta a partir de la API basketCtrl
// Crear Cesta -- Crud
router.post('/createBasket', [], basketCtrl.addItemToBasket);

// Obtener Cesta por Cliente -- Crud
router.get('/getClientBasket/:basketId', basketCtrl.getBasketById);

// Exportando rutas
exports.default = router;