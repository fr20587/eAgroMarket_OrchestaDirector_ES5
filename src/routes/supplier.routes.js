'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _expressValidator = require('express-validator');

var _supplier = require('../controllers/supplier.controller');

var supplierCtrl = _interopRequireWildcard(_supplier);

var _middlewares = require('../middlewares');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } }
        newObj.default = obj; return newObj; } }

// Utilizando la función Router

// Importando API userCrtl
// Importando la función Router de express
var router = (0, _express.Router)();

// Creando rutas para gestionar los roles a partir de la API roleCrtl

// Obtener todos los roles - cRud


// Middlewares

// Importando express-validator para validar campos de los formularios
router.get('/', _middlewares.authJwt.verifyUserToken, supplierCtrl.getSuppliers);

// Exportando rutas de roles
exports.default = router;