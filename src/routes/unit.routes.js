'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _expressValidator = require('express-validator');

var _unit = require('../controllers/unit.controllers');

var unitCtrl = _interopRequireWildcard(_unit);

var _middlewares = require('../middlewares');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } }
        newObj.default = obj; return newObj; } }

/* 
    Unidades de medida
    path: 'api/unit'
*/

// Utilizando la función Router


// Controller
// Express Modules
var router = (0, _express.Router)();

// Crear unidad de medida -- Crud


// Middlewares
router.post('/', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isModerator, (0, _expressValidator.check)('name', 'El nombre es obligatorio').not().isEmpty(), _middlewares.validationFields], unitCtrl.createUnit);

// Obtener unidades de medida -- cRud
router.get('/', [_middlewares.parseQuery.parseIntMiddleware], unitCtrl.getUnits);

// Obtener un unidad de medida -- cRud
router.get('/:id', [], unitCtrl.getUnitById);

// Actualizar una unidad de medida -- crUd
router.put('/:id', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isModerator], unitCtrl.updateUnitById);

// Eliminar una unidad de medida -- cruD  
router.delete('/:id', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isAdmin], unitCtrl.deleteUnitById);

// Exportando rutas de unidad de medida
exports.default = router;