'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isAdmin = exports.isModerator = exports.verifyClientToken = exports.verifyUserToken = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _role = require('../models/role.model');

var _role2 = _interopRequireDefault(_role);

var _client = require('../models/client.model');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Third's Modules
var verifyUserToken = exports.verifyUserToken = async function verifyUserToken(req, res, next) {
    // Ubicando el token
    var token = req.header('x-token');

    if (!token) return res.status(403).json({
        ok: false,
        message: '403 - Token no válido'
    });

    try {
        var decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET_KEY_T_USER);
        req.userId = decoded.id;

        var user = await _user2.default.findById(req.userId, { password: 0 });
        if (!user) return res.status(404).json({
            ok: false,
            message: '404 - Token no válido'
        });

        next();
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
};

// Models
var verifyClientToken = exports.verifyClientToken = async function verifyClientToken(req, res, next) {
    try {
        // Ubicando el token
        var token = req.header('x-token');

        if (!token) return res.status(403).json({
            ok: false,
            message: '403 - Token no válido'
        });

        var decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET_KEY_T_USER);
        req.clientId = decoded.id;

        var client = await _client2.default.findById(req.clientId, { password: 0 });
        if (!client) return res.status(404).json({
            ok: false,
            message: '404 - Token no válido'
        });

        next();
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
};

var isModerator = exports.isModerator = async function isModerator(req, res, next) {
    var user = await _user2.default.findById(req.userId);
    var roles = await _role2.default.find({ _id: { $in: user.roles } });

    for (var i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next();
            return;
        }
    }
    return res.status(403).json({
        ok: false,
        message: 'El usuario no tiene permiso'
    });
};

var isAdmin = exports.isAdmin = async function isAdmin(req, res, next) {
    var user = await _user2.default.findById(req.userId);
    var roles = await _role2.default.find({ _id: { $in: user.roles } });

    for (var i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next();
            return;
        }
    }
    return res.status(403).json({
        ok: false,
        message: 'El usuario no tiene permiso'
    });
};