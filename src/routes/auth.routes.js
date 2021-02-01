'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _expressValidator = require('express-validator');

var _auth = require('../controllers/auth.controllers');

var authCtrl = _interopRequireWildcard(_auth);

var _middlewares = require('../middlewares');

var _auhtJwt = require('../middlewares/auhtJwt.middlewares');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } }
        newObj.default = obj; return newObj; } }

// Router Function
// Middleware para la validación del formulario de registro

// Importando API auhtCrtl
// Importando la función Router de express
var router = (0, _express.Router)();

// Creando rutas para gestionar el registro y la autenticación a partir de la API authCrtl
// Clientes
// Middleware para la validación en el registro de clientes


// Middlewares

// Importando express-validator para validar campos de los formularios
router.post('/signUpClient', [(0, _expressValidator.check)('email', 'El correo es obligatorio').isEmail(), (0, _expressValidator.check)('password', 'El password es obligatorio').not().isEmpty(), (0, _expressValidator.check)('name', 'El nombre de usuario es obligatorio').not().isEmpty(), (0, _expressValidator.check)('lastName', 'El apellido es obligatorio').not().isEmpty(), _middlewares.validationFields, _middlewares.verifySignUp.checkDuplicateClientEmail], authCtrl.signUpClient);

router.post('/signInClient', [(0, _expressValidator.check)('password', 'El password es obligatorio').not().isEmpty(), (0, _expressValidator.check)('email', 'El correo es obligatorio').isEmail(), _middlewares.validationFields], authCtrl.signInClient);

// Usuarios
router.post('/signUpUser', [(0, _expressValidator.check)('email', 'El correo es obligatorio').isEmail(), (0, _expressValidator.check)('password', 'El password es obligatorio').not().isEmpty(), (0, _expressValidator.check)('name', 'El nombre de usuario es obligatorio').not().isEmpty(), (0, _expressValidator.check)('lastName', 'El apellido es obligatorio').not().isEmpty(), _middlewares.validationFields, _middlewares.verifySignUp.checkDuplicateClientEmail], authCtrl.signUpUser);

router.post('/signInUser', [(0, _expressValidator.check)('password', 'El password es obligatorio').not().isEmpty(), (0, _expressValidator.check)('email', 'El correo es obligatorio').isEmail(), _middlewares.validationFields, _middlewares.verifySignUp.checkRolesExisted], authCtrl.signInUser);

// Renovar token
router.get('/renewToken', _auhtJwt.verifyClientToken, authCtrl.renewToken);

// Renovar user token
router.get('/renewUserToken', _auhtJwt.verifyUserToken, authCtrl.renewUserToken);

// Exportando rutas de productos
exports.default = router;