'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _expressDevice = require('express-device');

var _expressDevice2 = _interopRequireDefault(_expressDevice);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _initialSetup = require('./libs/initialSetup');

var _auth = require('./routes/auth.routes');

var _auth2 = _interopRequireDefault(_auth);

var _basket = require('./routes/basket.routes');

var _basket2 = _interopRequireDefault(_basket);

var _category = require('./routes/category.routes');

var _category2 = _interopRequireDefault(_category);

var _city = require('./routes/city.routes');

var _city2 = _interopRequireDefault(_city);

var _client = require('./routes/client.routes');

var _client2 = _interopRequireDefault(_client);

var _deliveryMethod = require('./routes/deliveryMethod.routes');

var _deliveryMethod2 = _interopRequireDefault(_deliveryMethod);

var _delivery = require('./routes/delivery.routes');

var _delivery2 = _interopRequireDefault(_delivery);

var _ingredient = require('./routes/ingredient.routes');

var _ingredient2 = _interopRequireDefault(_ingredient);

var _message = require('./routes/message.routes');

var _message2 = _interopRequireDefault(_message);

var _order = require('./routes/order.routes');

var _order2 = _interopRequireDefault(_order);

var _products = require('./routes/products.routes');

var _products2 = _interopRequireDefault(_products);

var _role = require('./routes/role.routes');

var _role2 = _interopRequireDefault(_role);

var _search = require('./routes/search.routes');

var _search2 = _interopRequireDefault(_search);

var _uploads = require('./routes/uploads.routes');

var _uploads2 = _interopRequireDefault(_uploads);

var _unit = require('./routes/unit.routes');

var _unit2 = _interopRequireDefault(_unit);

var _user = require('./routes/user.routes');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Iniciar framework

//? import brandRoutes from './routes/brand.routes';


// Importando rutas

// Importando cors para comunicar frontEnd con backEnd

// Importando datos generales de la aplicación

// Importando morgan para visualizar las peticiones y sus salidas
var app = (0, _express2.default)();

// Crear datos iniciales usuario administrador, roles, estados de las órdenes, municipios ...

//? import supplierRoutes from './routes/supplier.routes';

// Importando Valores predeterminados

// Importando express-device para saber que dispositivo usa el usuario

// Importando helmet para impedir la visualización de datos del servidor

// Importando express
(0, _initialSetup.createAdmin)();
//? createBrands();
(0, _initialSetup.createCategories)();
(0, _initialSetup.createCities)();
(0, _initialSetup.createDeliveryMethods)();
(0, _initialSetup.createOrderStatus)();
(0, _initialSetup.createPaymentMethods)();
(0, _initialSetup.createPaymentStatus)();
(0, _initialSetup.createRoles)();
//? createSuppliers();
(0, _initialSetup.createUnits)();

// Datos generales del proyecto
app.set('pkg', _package2.default);

// Middlewares
app.use((0, _morgan2.default)('dev'));
app.use((0, _helmet2.default)()); // ...
app.use(_expressDevice2.default.capture()); // Capturar tipo de dispositivo
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));
app.use((0, _cors2.default)());

var whitelist = ['http://localhost:4200', 'http://localhost:4201'];

/* var corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Access Denied! :('));
        }
    }
} */

app.use('/public', _express2.default.static('public'));

// Ruta inicial
app.get('/', function(req, res) {
    res.json({
        message: 'Welcome to: ATHENDAT | BackEnd Orchesta Director App, enjoy the music! :)',
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        version: app.get('pkg').version,
        keywords: app.get('pkg').keywords,
        description: app.get('pkg').description,
        license: app.get('pkg').license
    });
});

// Rutas
app.use('/api/auth', _auth2.default);
app.use('/api/basket', _basket2.default);
//? app.use('/api/brand', brandRoutes);
app.use('/api/category', _category2.default);
app.use('/api/city', _city2.default);
app.use('/api/client', _client2.default);
app.use('/api/delivery', _delivery2.default);
app.use('/api/deliveryMethod', _deliveryMethod2.default);
app.use('/api/ingredient', _ingredient2.default);
app.use('/api/message', _message2.default);
app.use('/api/order', _order2.default);
app.use('/api/product', _products2.default);
app.use('/api/role', _role2.default);
app.use('/api/search', _search2.default);
//? app.use('/api/supplier', supplierRoutes);
app.use('/api/upload', _uploads2.default);
app.use('/api/unit', _unit2.default);
app.use('/api/user', _user2.default);

//! app.use('/api/products/category', productsRoutes);

exports.default = app;