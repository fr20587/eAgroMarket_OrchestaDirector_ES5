'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _expressValidator = require('express-validator');

var _product = require('../controllers/product.controllers');

var productCtrl = _interopRequireWildcard(_product);

var _middlewares = require('../middlewares');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } }
        newObj.default = obj; return newObj; } }

/* 
    Productos
    path: 'api/product'
*/

// Router


// Controller
// Express Modules
var router = (0, _express.Router)();

// Creando rutas para gestionar los productos a partir de la API productCrtl
// Crear producto -- Crud


// Middlewares
router.post('/', [_middlewares.authJwt.verifyUserToken,
    // authJwt.isModerator,
    _middlewares.uploadImages.single('image')
], productCtrl.createProduct);

// Obtener productos -- cRud
router.get('/', [_middlewares.parseQuery.parseIntMiddleware], productCtrl.getProducts);

// Obtener un producto -- cRud
router.get('/:id', [_middlewares.verifyIfExist.checkIfExistProduct], productCtrl.getProductById);

// Obtener un producto por categoría -- cRud
router.get('/category/:categoryId', _middlewares.parseQuery.parseIntMiddleware, productCtrl.getProductsByCategory);

// Actualizar un producto -- crUd
router.put('/:id', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isModerator, _middlewares.verifyIfExist.checkIfExistProduct], productCtrl.updateProductById);

// Eliminar un producto -- cruD  
router.delete('/:id', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isAdmin, _middlewares.verifyIfExist.checkIfExistProduct], productCtrl.deleteProductById);

// Export Routes
exports.default = router;