'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _expressFileupload = require('express-fileupload');

var _expressFileupload2 = _interopRequireDefault(_expressFileupload);

var _uploads = require('../controllers/uploads.controllers');

var uploadCtrl = _interopRequireWildcard(_uploads);

var _middlewares = require('../middlewares');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } }
        newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
    Productos
    path: 'api/product'
*/

// Router


// Controllers
// Express Modules
var router = (0, _express.Router)();

// Middlewares


router.use((0, _expressFileupload2.default)());

// Actualizar imange -- crUd
router.put('/:type/:id', [_middlewares.authJwt.verifyUserToken], uploadCtrl.fileUpload);

// Obtener imange -- crUd
router.get('/:type/:image', [
    // authJwt.verifyUserToken
], uploadCtrl.getFile);

// Export Routes
exports.default = router;