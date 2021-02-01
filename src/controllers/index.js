"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userCtrl = exports.productCtrl = exports.orderCtrl = exports.clientCtrl = exports.auhtCtrl = undefined;

var _auth = require("./auth.controllers");

var auhtCtrl = _interopRequireWildcard(_auth);

var _client = require("./client.controllers");

var clientCtrl = _interopRequireWildcard(_client);

var _order = require("./order.controllers");

var orderCtrl = _interopRequireWildcard(_order);

var _product = require("./product.controllers");

var productCtrl = _interopRequireWildcard(_product);

var _user = require("./user.controllers");

var userCtrl = _interopRequireWildcard(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } }
        newObj.default = obj; return newObj; } }

exports.auhtCtrl = auhtCtrl;
exports.clientCtrl = clientCtrl;
exports.orderCtrl = orderCtrl;
exports.productCtrl = productCtrl;
exports.userCtrl = userCtrl;