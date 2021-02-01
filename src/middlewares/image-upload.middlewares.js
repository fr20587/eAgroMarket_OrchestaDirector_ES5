"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.uploadImages = undefined;

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dest = _path2.default.join(__dirname, '../../public/images/products');

var storage = _multer2.default.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, dest);
    },
    filename: function filename(req, file, cb) {
        var filename = Date.now() + '-' + file.originalname.toLowerCase().split(' ').join('-');
        cb(null, filename);
    }
});

var uploadImages = exports.uploadImages = (0, _multer2.default)({
    storage: storage,
    fileFilter: function fileFilter(req, file, cb) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Formato de imagen no válido, solo se aceptan: .png .jpg . jpeg'));
        }
    },
    limits: { filesize: 5000000 }
});