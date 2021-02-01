'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renewUserToken = exports.renewToken = exports.signInUser = exports.signUpUser = exports.signInClient = exports.signUpClient = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _expressValidator = require('express-validator');

var _client = require('../models/client.model');

var _client2 = _interopRequireDefault(_client);

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _role = require('../models/role.model');

var _role2 = _interopRequireDefault(_role);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Lógica de registro de nuevos clientes


// Express-Validator
var signUpClient = exports.signUpClient = async function signUpClient(req, res) {
    var _req$body = req.body;
    var name = _req$body.name;
    var lastName = _req$body.lastName;
    var email = _req$body.email;
    var password = _req$body.password;
    var roles = _req$body.roles;


    try {
        var existClient = await _client2.default.findOne({ email: email });
        if (existClient) {
            return res.status(400).json({
                ok: false,
                message: 'Email no válido, el usuario ya existe'
            });
        }

        var newClient = new _client2.default({
            name: name,
            lastName: lastName,
            email: email,
            password: await _client2.default.encryptPassword(password)
        });
        console.log(newClient);

        // Asignar el rol user por defecto a los clientes
        var role = await _role2.default.findOne({ name: "client" });
        newClient.roles = role._id;

        // Guardar usuario en la DB
        var savedClient = await newClient.save();

        // Generación de token de seguridad, la clave secreta está guardada en una variable de entorno del sistema
        var token = _jsonwebtoken2.default.sign({ id: savedClient._id }, process.env.SECRET_KEY_T_USER, {
            expiresIn: 10800 // Tiempo de vigencia del token 8 horas
        });

        // Respuestas al completar el registro, se envía en token en la cabecera de la url
        res.status(200).json({
            ok: true,
            token: token,
            message: 'Usuario creado correctamente'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'No se ha podido crear el cliente en la DB'
        });
    }
};

// Lógica de autenticación de clientes


// Models
// JSON WEB TOKEN
var signInClient = exports.signInClient = async function signInClient(req, res) {
    // Parámetros a recibir a travez del body de la aplicación
    var _req$body2 = req.body;
    var email = _req$body2.email;
    var password = _req$body2.password;


    try {
        // Buscar cliente por email en la DB
        var clientFound = await _client2.default.findOne({ email: email }).populate("roles");

        // Respuesta si el usuario no se encuentra
        if (!clientFound) {
            return res.status(400).json({
                message: 'Usuario o contraseña incorrectos'
            });
        }

        // Comprobar la contraseña 
        var matchPassword = await _client2.default.comparePassword(password, clientFound.password);

        // Respuesta si la contraseña es incorrecta
        if (!matchPassword) {
            return res.status(401).json({
                message: 'Contraseña o usuario incorrectos'
            });
        }

        // Generando token si las credenciales son válidas
        var token = _jsonwebtoken2.default.sign({ id: clientFound._id }, process.env.SECRET_KEY_T_USER, {
            expiresIn: 10800 // Tiempo de vigencia del token 8 horas
        });

        // Confirmación de inicio de sesión y enviando token en la cabecera
        res.status(200).json({
            token: token,
            message: 'Ha iniciado sesión correctamente'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'No se ha podido iniciar la sesión, itentelo nuevamente, si el error persiste contacte con el servicio de atención al cliente.'
        });
    }
};

// Lógica de registro de nuevos clientes
var signUpUser = exports.signUpUser = async function signUpUser(req, res) {
    // Parámetros a recibir a travez del body de la aplicación
    var _req$body3 = req.body;
    var name = _req$body3.name;
    var lastName = _req$body3.lastName;
    var email = _req$body3.email;
    var password = _req$body3.password;
    var roles = _req$body3.roles;


    try {

        var existUser = await _user2.default.findOne({ email: email });
        if (existUser) {
            return res.status(400).json({
                message: 'Email no válido, el usuario ya existe'
            });
        }

        // Crear nuevo usuario
        var newUser = new _user2.default({
            name: name,
            lastName: lastName,
            email: email,
            password: await _user2.default.encryptPassword(password)
        });
        console.log(newUser);

        // Asignar el rol user por defecto a los usuarios
        var role = await _role2.default.findOne({ name: "user" });
        newUser.roles = role._id;

        // Guardar usuario en la DB
        var savedUser = await newUser.save();

        // Generación de token de seguridad, la clave secreta está guardada en una variable de entorno del sistema
        var token = _jsonwebtoken2.default.sign({ id: savedUser._id }, process.env.SECRET_KEY_T_USER, {
            expiresIn: 10800 // Tiempo de vigencia del token 8 horas
        });

        // Respuestas al completar el registro, se envía en token en la cabecera de la url
        res.status(200).json({
            message: 'Usuario creado correctamente',
            token: token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'No se ha podido crear el cliente en la DB'
        });
    }
};

// Lógica de autenticación de usuarios
var signInUser = exports.signInUser = async function signInUser(req, res) {
    // Parámetros a recibir a travez del body de la aplicación
    var _req$body4 = req.body;
    var email = _req$body4.email;
    var password = _req$body4.password;


    try {
        // Buscar usuario por email en la DB
        var userFound = await _user2.default.findOne({ email: email }).populate("roles");

        // Respuesta si el usuario no se encuentra
        if (!userFound) return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });

        // Comprobar la contraseña 
        var matchPassword = await _user2.default.comparePassword(password, userFound.password);

        // Respuesta si la contraseña es incorrecta
        if (!matchPassword) return res.status(401).json({ messages: 'Contraseña o usuario incorrecta' });

        // Generando token si las credenciales son válidas
        var token = _jsonwebtoken2.default.sign({ id: userFound._id }, process.env.SECRET_KEY_T_USER, {
            expiresIn: 10800 // Tiempo de vigencia del token 8 horas
        });

        // Confirmación de inicio de sesión y enviando token en la cabecera
        res.status(200).header('x-token', token).json({
            message: 'Ha iniciado correctamente',
            token: token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'No se ha podido iniciar la sesión, itentelo nuevamente, si el error persiste contacte con el servicio de atención al cliente.' });
    }
};

var renewToken = exports.renewToken = async function renewToken(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? response : arguments[1];


    var clientId = req.clientId;

    // Generando token si las credenciales son válidas
    var token = _jsonwebtoken2.default.sign({ id: clientId }, process.env.SECRET_KEY_T_USER, {
        expiresIn: 10800 // Tiempo de vigencia del token 8 horas
    });

    var client = await _client2.default.findById(clientId).populate('roles', 'name');

    res.json({
        token: token,
        client: client
    });
};

var renewUserToken = exports.renewUserToken = async function renewUserToken(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? response : arguments[1];


    var userId = req.userId;

    // Generando token si las credenciales son válidas
    var token = _jsonwebtoken2.default.sign({ id: userId }, process.env.SECRET_KEY_T_USER, {
        expiresIn: 10800 // Tiempo de vigencia del token 8 horas
    });

    var user = await _user2.default.findById(userId).populate('roles', 'name');

    res.json({
        token: token,
        user: user
    });
};