'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _ingredient = require('../controllers/ingredient.controllers');

var ingredientCtrl = _interopRequireWildcard(_ingredient);

var _middlewares = require('../middlewares');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } }
        newObj.default = obj; return newObj; } }

// Utilizando la función Router

// Importando API ingredientCtrl
var router = (0, _express.Router)();

// Creando rutas para gestionar los categorías a partir de la API ingredientCtrl
// Crear ingrediente -- Crud

// Importando middlewares
// Importando la función Router de express
router.post('/', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isModerator], ingredientCtrl.createIngredient);

// Obtener ingredientes -- cRud
router.get('/', [_middlewares.parseQuery.parseIntMiddleware], ingredientCtrl.getIngredients);

// Obtener un ingredientea -- cRud
router.get('/:ingredientId', [_middlewares.verifyIfExist.checkIfExistCategory], ingredientCtrl.getIngredientById);

// Actualizar un ingredientea -- crUd
router.put('/:ingredientId', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isModerator, _middlewares.verifyIfExist.checkIfExistCategory], ingredientCtrl.updateIngredientById);

// Eliminar un ingrediente -- cruD  
router.delete('/:ingredientId', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isAdmin, _middlewares.verifyIfExist.checkIfExistCategory], ingredientCtrl.deleteIngredientById);

// Exportando rutas de categorías
exports.default = router;