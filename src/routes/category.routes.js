'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _expressValidator = require('express-validator');

var _category = require('../controllers/category.controllers');

var categoryCtrl = _interopRequireWildcard(_category);

var _middlewares = require('../middlewares');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } }
        newObj.default = obj; return newObj; } }

/* 
    Categorías
    path: 'api/category'
*/

// Utilizando la función Router


// Controller
// Express Modules
var router = (0, _express.Router)();

// Crear categoría -- Crud


// Middlewares
router.post('/', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isModerator, (0, _expressValidator.check)('name', 'El nombre es obligatorio').not().isEmpty(), _middlewares.validationFields], categoryCtrl.createCategory);

// Obtener categorías -- cRud
router.get('/', [_middlewares.parseQuery.parseIntMiddleware], categoryCtrl.getCategories);

// Obtener un categoría -- cRud
router.get('/:id', [_middlewares.verifyIfExist.checkIfExistCategory], categoryCtrl.getCategoryById);

// Actualizar una categoría -- crUd
router.put('/:id', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isModerator, _middlewares.verifyIfExist.checkIfExistCategory], categoryCtrl.updateCategoryById);

// Eliminar una categoría -- cruD  
router.delete('/:id', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isAdmin, _middlewares.verifyIfExist.checkIfExistCategory], categoryCtrl.deleteCategoryById);

// Exportando rutas de categorías
exports.default = router;