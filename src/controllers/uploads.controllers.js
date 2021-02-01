'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFile = exports.fileUpload = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _express = require('express');

var _uuid = require('uuid');

var _updateImage = require('../helpers/update-image');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Third's Modules
var fileUpload = exports.fileUpload = function fileUpload(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];
    var _req$params = req.params;
    var type = _req$params.type;
    var id = _req$params.id;

    // Validar tipo

    var typeValid = ['categories', 'products', 'users'];
    if (!typeValid.includes(type)) {
        return res.status(400).json({
            message: 'El tipo seleccionado no es una: Categoría, Producto o Usuario'
        });
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            message: 'No se encontró ningún archivo'
        });
    }

    // Procesar la imagen
    var file = req.files.image;

    var nameCut = file.name.split('.');
    var extensionFile = nameCut[nameCut.length - 1];

    // Validar extension
    var extensionValid = ['png', 'jpg', 'jpeg'];
    if (!extensionValid.includes(extensionFile)) {
        return res.status(400).json({
            message: 'Archivo no válido solo se aceptan: ' + extensionValid
        });
    }

    // Generar el nombre del archivo
    var nameFile = (0, _uuid.v4)() + '.' + extensionFile;

    // Path para guardar la imagen
    var path = './public/images/' + type + '/' + nameFile;

    // Mover el archivo
    file.mv(path, function(err) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Error al guardar el archivo'
            });
        }

        // Actualizar archivo
        (0, _updateImage.updateImage)(type, id, nameFile);

        res.json({
            ok: true,
            message: 'Archivo subido correctamente al servidor',
            name: nameFile
        });
    });
};

// Express Modules
// Node Modules
var getFile = exports.getFile = function getFile(req) {
    var res = arguments.length <= 1 || arguments[1] === undefined ? _express.response : arguments[1];
    var _req$params2 = req.params;
    var type = _req$params2.type;
    var image = _req$params2.image;


    var pathImg = _path2.default.join(__dirname, '../../public/images/' + type + '/' + image);

    // Imagen por defecto
    if (_fs2.default.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        var _pathImg = _path2.default.join(__dirname, '../../public/images/no-image.png');
        res.sendFile(_pathImg);
    }
};