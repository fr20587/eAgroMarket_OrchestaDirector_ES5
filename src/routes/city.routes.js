'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _expressValidator = require('express-validator');

var _city = require('../controllers/city.controllers');

var cityCtrl = _interopRequireWildcard(_city);

var _middlewares = require('../middlewares');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } }
        newObj.default = obj; return newObj; } }

/* 
    municipios
    path: 'api/city'
*/

// Utilizando la función Router


// Controller
// Express Modules
var router = (0, _express.Router)();

// Crear municipio -- Crud


// Middlewares
router.post('/', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isModerator, (0, _expressValidator.check)('name', 'El nombre es obligatorio').not().isEmpty(), _middlewares.validationFields], cityCtrl.createCity);

// Obtener municipios -- cRud
router.get('/', [_middlewares.parseQuery.parseIntMiddleware], cityCtrl.getCities);

// Obtener un municipio -- cRud
router.get('/:id', [], cityCtrl.getCityById);

// Actualizar una municipio -- crUd
router.put('/:id', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isModerator], cityCtrl.updateCityById);

// Eliminar una municipio -- cruD  
router.delete('/:id', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isAdmin], cityCtrl.deleteCityById);

// Exportando rutas de municipios
exports.default = router;