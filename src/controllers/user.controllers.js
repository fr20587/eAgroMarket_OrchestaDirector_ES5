'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getUsers = exports.createUser = undefined;

var _slicedToArray = function() {
    function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true;
            _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // Express Modules


// Models


var _express = require('express');

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _role = require('../models/role.model');

var _role2 = _interopRequireDefault(_role);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// API REST para gestión de usuarios. CRUD
// Crear nuevo usuario -- Crud
var createUser = exports.createUser = async function createUser(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];
    var _req$body = req.body;
    var name = _req$body.name;
    var lastName = _req$body.lastName;
    var gender = _req$body.gender;
    var birthday = _req$body.birthday;
    var email = _req$body.email;
    var phone = _req$body.phone;
    var password = _req$body.password;
    var roles = _req$body.roles;
    var img = _req$body.img;


    try {
        var existUser = await _user2.default.findOne({ email: email });
        if (existUser) {
            return res.status(400).json({
                ok: false,
                message: 'Email no válido, el usuario ya existe'
            });
        }

        var newUser = new _user2.default({
            userId: req.userId,
            name: name,
            lastName: lastName,
            gender: gender,
            birthday: birthday,
            email: email,
            phone: phone,
            password: await _user2.default.encryptPassword(password),
            roles: roles,
            img: img
        });

        // Comprobar si se está introduciendo el rol del usuario
        if (req.body.roles) {
            // Si se introduce rol, relacionar el id del mismo en la DB
            var foundRoles = await _role2.default.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map(function(role) {
                return role._id;
            });
        } else {
            // Si no se introduce rol asignar el rol user por defecto
            var role = await _role2.default.findOne({ name: "user" });
            newUser.roles = [role._id];
        }

        // Guardando usuario en la DB
        await newUser.save();

        // Mensaje de confirmación
        res.status(201).json({
            ok: true,
            message: 'Usuario creado correctamente',
            user: newUser
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            messages: 'No se ha podido crear el usuario en la DB'
        });
    }
};

// Obtener todos los usuarios -- cRud
var getUsers = exports.getUsers = async function getUsers(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];

    var from = Number(req.query.from) || 0;

    var _ref = await Promise.all([_user2.default.find({}, 'name lastName email roles phone img gender birthday address street1 street2 city state postalCode info').populate('roles', 'name').skip(from).limit(5), _user2.default.countDocuments()]);

    var _ref2 = _slicedToArray(_ref, 2);

    var users = _ref2[0];
    var total = _ref2[1];

    res.status(200).json({
        ok: true,
        total: total,
        users: users
    });
};

// Obtener un usuario -- cRud
var getUserById = exports.getUserById = async function getUserById(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];

    // Definiendo id del usuario
    var userId = req.params.userId;

    // Acción de búzqueda

    var user = await _user2.default.findById(userId);
    res.status(200).json({
        ok: true,
        user: user
    });
};

// Editar usuario -- crUd
var updateUserById = exports.updateUserById = async function updateUserById(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];

    // Definiendo id del usuario
    var userId = req.params.userId;

    // Campos a actualizar
    const { password, email, ...fields } = req.body;


    try {
        var user = _user2.default.findById(userId);

        if (user.email !== email) {

            var existEmail = await _user2.default.findOne({ email: email });
            if (existEmail) {
                return res.status(400).json({
                    ok: false,
                    message: 'El email ya existe en la DB'
                });
            }
        }

        // Comprobar si se está introduciendo el rol del usuario
        /* if (req.body.roles) {
            const foundRoles = await Role.find({ name: { $in: roles } })
            user.roles = foundRoles.map((role) => role._id)
        } */

        fields.email = email;

        // Acción de actualización
        var userUpdated = await _user2.default.findByIdAndUpdate(userId, fields, {
            new: true
        });
        res.status(200).json({
            ok: true,
            message: 'Datos de usuario actualizado correctamente',
            user: userUpdated
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            messages: 'No se ha podido actualizar los datos del usuario en la DB, revise sus privilegios e intentelo de nuevo y si el error persiste contacte con el servicio de atención al cliente'
        });
    }
};

// Eliminar usuario -- cruD
var deleteUserById = exports.deleteUserById = async function deleteUserById(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];

    // Definiendo id del usuario
    var userId = req.params.userId;


    try {
        // Acción de borrado
        await _user2.default.findByIdAndDelete(userId);
        res.status(200).json({
            ok: true,
            message: 'Usuario eliminado correctamente'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            messages: 'No se ha podido eliminar el usuario en la DB, revise sus privilegios e intentelo de nuevo y si el error persiste contacte con el servicio de atención al cliente'
        });
    }
};