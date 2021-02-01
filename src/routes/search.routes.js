'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _search = require('../controllers/search.controllers');

var searchCtrl = _interopRequireWildcard(_search);

var _middlewares = require('../middlewares');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } }
        newObj.default = obj; return newObj; } }

/* 
    Buscar
    path: /api/search

*/

// Router


// Controllers
var router = (0, _express.Router)();

// Buscar en todas las colecciones


// Middlewares
// Express Modules
router.get('/:search', [_middlewares.authJwt.verifyUserToken], searchCtrl.getAll);

// Buscar en una colección expecífica
router.get('/colection/:document/:search', [_middlewares.authJwt.verifyUserToken], searchCtrl.getColectionDocument);

// Export Routes
exports.default = router;