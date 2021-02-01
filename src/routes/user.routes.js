'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _expressValidator = require('express-validator');

var _user = require('../controllers/user.controllers');

var userCtrl = _interopRequireWildcard(_user);

var _middlewares = require('../middlewares');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } }
        newObj.default = obj; return newObj; } }

// Utilizando la función Router

// Importando API userCrtl
// Importando la función Router de express
var router = (0, _express.Router)();

// Creando rutas para gestionar los usuarios a partir de la API userCrtl
// Crear usuario - Crud


// Middlewares

// Importando express-validator para validar campos de los formularios
router.post('/', [
    // authJwt.verifyUserToken,
    // authJwt.isAdmin,
    (0, _expressValidator.check)('email', 'El correo es obligatorio').isEmail(), (0, _expressValidator.check)('password', 'El password es obligatorio').not().isEmpty(), (0, _expressValidator.check)('name', 'El nombre de usuario es obligatorio').not().isEmpty(), (0, _expressValidator.check)('lastName', 'El apellido es obligatorio').not().isEmpty(), _middlewares.verifySignUp.checkDuplicateUserEmail, _middlewares.verifySignUp.checkRolesExisted
], userCtrl.createUser);

// Obtener todos los usuarios - cRud
router.get('/', _middlewares.authJwt.verifyUserToken, userCtrl.getUsers);

// Obtener un usuario - cRud
router.get('/:userId', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isAdmin, _middlewares.verifyIfExist.checkIfExistUser], userCtrl.getUserById);

// Actualizar un usuario - crUd
router.put('/:userId', [_middlewares.authJwt.verifyUserToken], userCtrl.updateUserById);

// Eliminar un usuario - cruD
router.delete('/:userId', [_middlewares.authJwt.verifyUserToken, _middlewares.authJwt.isAdmin, _middlewares.verifyIfExist.checkIfExistUser], userCtrl.deleteUserById);

// Exportando rutas de usuarios
exports.default = router;