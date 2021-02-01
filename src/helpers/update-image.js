'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateImage = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _category = require('../models/category.model');

var _category2 = _interopRequireDefault(_category);

var _product = require('../models/product.model');

var _product2 = _interopRequireDefault(_product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Node Modules
var deleteFile = function deleteFile(path) {
    if (_fs2.default.existsSync(path)) {
        // Borrar archivo
        _fs2.default.unlinkSync(path);
    }
};

// Models
var updateImage = exports.updateImage = async function updateImage(type, id, nameFile) {
    var pathOld = '';

    switch (type) {
        case 'categories':
            var category = await _category2.default.findById(id);
            if (!category) {
                console.log('No existe una categoria con ese id');
                return false;
            }

            pathOld = './public/images/products/' + category.img;
            deleteFile(pathOld);

            category.img = nameFile;
            await category.save();
            return true;

            break;

        case 'products':
            var product = await _product2.default.findById(id);
            if (!product) {
                console.log('No existe un producto con ese id');
                return false;
            }

            pathOld = './public/images/products/' + product.img;
            deleteFile(pathOld);

            product.img = nameFile;
            await product.save();
            return true;

            break;

        case 'users':
            var user = await _user2.default.findById(id);
            if (!user) {
                console.log('No existe un usuario con ese id');
                return false;
            }

            pathOld = './public/images/users/' + user.img;
            deleteFile(pathOld);

            user.img = nameFile;
            await user.save();
            return true;

            break;
    }
};