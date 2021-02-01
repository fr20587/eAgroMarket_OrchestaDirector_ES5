'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkRolesExisted = exports.checkDuplicateClientEmail = exports.checkDuplicateUserEmail = undefined;

var _role = require('../models/role.model');

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _client = require('../models/client.model');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkDuplicateUserEmail = exports.checkDuplicateUserEmail = async function checkDuplicateUserEmail(req, res, next) {
    // Captando el email enviado por el usuario
    var user = await _user2.default.findOne({ email: req.body.email });

    // Comprobar si el email ya existe
    if (user) return res.status(400).json({ message: 'El correo ya existe en la BD' });

    next();
};

var checkDuplicateClientEmail = exports.checkDuplicateClientEmail = async function checkDuplicateClientEmail(req, res, next) {
    // Captando el email enviado por el usuario
    var user = await _client2.default.findOne({ email: req.body.email });

    // Comprobar si el email ya existe
    if (user) return res.status(400).json({ message: 'Este cliente ya existe, inicie sesión' });

    next();
};

var checkRolesExisted = exports.checkRolesExisted = function checkRolesExisted(req, res, next) {
    if (req.body.roles) {
        for (var i = 0; i < req.body.roles.length; i++) {
            if (!_role.ROLES.includes(req.body.roles[i])) {
                res.status(400).json({ massage: 'El role ' + req.body.roles[i] + ' no existe' });
            };
        };
    };

    next();
};