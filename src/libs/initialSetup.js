'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createUnits = exports.createDeliveryMethods = exports.createCategories = exports.createPaymentStatus = exports.createPaymentMethods = exports.createCities = exports.createOrderStatus = exports.createAdmin = exports.createRoles = undefined;

var _category = require('../models/category.model');

var _category2 = _interopRequireDefault(_category);

var _city = require('../models/city.model');

var _city2 = _interopRequireDefault(_city);

var _deliveryMethod = require('../models/deliveryMethod.model');

var _deliveryMethod2 = _interopRequireDefault(_deliveryMethod);

var _role = require('../models/role.model');

var _role2 = _interopRequireDefault(_role);

var _orderStatus = require('../models/orderStatus.model');

var _orderStatus2 = _interopRequireDefault(_orderStatus);

var _paymentMethod = require('../models/paymentMethod.model');

var _paymentMethod2 = _interopRequireDefault(_paymentMethod);

var _paymentStatus = require('../models/paymentStatus.model');

var _paymentStatus2 = _interopRequireDefault(_paymentStatus);

var _unit = require('../models/unit.model');

var _unit2 = _interopRequireDefault(_unit);

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Brand from "../models/brand.model";
var createRoles = exports.createRoles = async function createRoles() {
    try {
        // Contador de roles(documentos em la DB)
        var count = await _role2.default.estimatedDocumentCount();

        // Revisando la cantidad de roles
        if (count > 0) return;

        // Creando roles por defecto
        var values = await Promise.all([new _role2.default({ name: 'user' }).save(), new _role2.default({ name: 'moderator' }).save(), new _role2.default({ name: 'admin' }).save(), new _role2.default({ name: 'client' }).save()]);

        console.log('Roles Created!');
    } catch (error) {
        console.error(error);
    }
};
// import Supplier from "../models/supplier.model";
var createAdmin = exports.createAdmin = async function createAdmin() {
    // Revisando si existe el usuario administrado (Admin)
    var user = await _user2.default.findOne({ email: "admin@localhost.com" });

    // Asignando roles al usuario
    var roles = await _role2.default.find({ name: { $in: ["admin", "moderator"] } });

    if (!user) {
        // Creando nuevo usuario
        await _user2.default.create({
            name: "super",
            lastName: "admin",
            email: "admin@localhost.com",
            password: await _bcrypt2.default.hash("admin", 10),
            roles: roles.map(function(role) {
                    return role._id;
                })
                //console.log('Admin User Created!')
        });
    }
};

var createOrderStatus = exports.createOrderStatus = async function createOrderStatus() {
    try {
        // Contador de estados (documentos en la DB)
        var count = await _orderStatus2.default.estimatedDocumentCount();

        // Revisando la cantidad de estados
        if (count > 0) return;

        // Creando estados por defecto
        var values = await Promise.all([new _orderStatus2.default({ name: 'recibida' }).save(), new _orderStatus2.default({ name: 'procesando' }).save(), new _orderStatus2.default({ name: 'transportando' }).save(), new _orderStatus2.default({ name: 'entregada' }).save()]);

        //console.log('OrderStatus Created!');
    } catch (error) {
        //console.error(error);
    }
};

var createCities = exports.createCities = async function createCities() {
    try {
        // Contador de municipios (documentos en la DB)
        var count = await _city2.default.estimatedDocumentCount();

        // Revisando la cantidad de municipios
        if (count > 0) return;

        // Creando municipios por defecto
        var values = await Promise.all([new _city2.default({
            name: 'Arroyo Naranjo',
            cost: 0
        }).save(), new _city2.default({
            name: 'Boyeros',
            cost: 0
        }).save(), new _city2.default({
            name: 'Centro Habana',
            cost: 0
        }).save(), new _city2.default({
            name: 'Cerro',
            cost: 0
        }).save(), new _city2.default({
            name: 'Cotorro',
            cost: 0
        }).save(), new _city2.default({
            name: 'Diez de Octubre',
            cost: 0
        }).save(), new _city2.default({
            name: 'Guanabacoa',
            cost: 0
        }).save(), new _city2.default({
            name: 'Habana del Este',
            cost: 0
        }).save(), new _city2.default({
            name: 'La Habana Vieja',
            cost: 0
        }).save(), new _city2.default({
            name: 'La Lisa',
            cost: 0
        }).save(), new _city2.default({
            name: 'Marianao',
            cost: 0
        }).save(), new _city2.default({
            name: 'Playa',
            cost: 0
        }).save(), new _city2.default({
            name: 'Plaza de la Revolución',
            cost: 0
        }).save(), new _city2.default({
            name: 'Regla',
            cost: 0
        }).save(), new _city2.default({
            name: 'San Miguel del Padrón',
            cost: 0
        }).save()]);

        //console.log('Cities Created!');
    } catch (error) {
        //console.error(error);
    }
};

var createPaymentMethods = exports.createPaymentMethods = async function createPaymentMethods() {
    try {
        // Contador de estados (documentos en la DB)
        var count = await _paymentMethod2.default.estimatedDocumentCount();

        // Revisando la cantidad de estados
        if (count > 0) return;

        // Creando estados por defecto
        var values = await Promise.all([new _paymentMethod2.default({ name: 'efectivo' }).save(), new _paymentMethod2.default({ name: 'trasfermovil' }).save(), new _paymentMethod2.default({ name: 'enzona' }).save()]);

        //console.log('PaymentMethods Created!');
    } catch (error) {
        //console.error(error);
    }
};

var createPaymentStatus = exports.createPaymentStatus = async function createPaymentStatus() {
    try {
        // Contador de estados (documentos en la DB)
        var count = await _paymentStatus2.default.estimatedDocumentCount();

        // Revisando la cantidad de estados
        if (count > 0) return;

        // Creando estados por defecto
        var values = await Promise.all([new _paymentStatus2.default({ name: 'pendiente' }).save(), new _paymentStatus2.default({ name: 'pagado' }).save()]);

        //console.log('PaymentStatus Created!');
    } catch (error) {
        //console.error(error);
    }
};

/* export const createBrands = async() => {
    try {
        // Contador de estados (documentos en la DB)
        const count = await Brand.estimatedDocumentCount();

        // Revisando la cantidad de estados
        if (count > 0) return;

        // Creando estados por defecto
        const values = await Promise.all([
            new Brand({ name: 'PizzaCub' }).save(),
            new Brand({ name: 'ATHENDAT' }).save()
        ]);

        console.log('Brands Created!');
    } catch (error) {
        console.error(error);
    }
}; */

var createCategories = exports.createCategories = async function createCategories() {
    try {
        // Contador de estados (documentos en la DB)
        var count = await _category2.default.estimatedDocumentCount();

        // Revisando la cantidad de estados
        if (count > 0) return;

        // Creando estados por defecto
        var values = await Promise.all([new _category2.default({ name: 'Frutas' }).save(), new _category2.default({ name: 'Vegetales' }).save(), new _category2.default({ name: 'Viandas' }).save(), new _category2.default({ name: 'Granos' }).save(), new _category2.default({ name: 'Conservas' }).save(), new _category2.default({ name: 'Especies' }).save(), new _category2.default({ name: 'Hierbas Aromaticas' }).save(), new _category2.default({ name: 'Huevos' }).save(), new _category2.default({ name: 'Carnes' }).save(), new _category2.default({ name: 'Embutidos' }).save(), new _category2.default({ name: 'Lacteos' }).save()]);

        //console.log('Categories Created!');
    } catch (error) {
        //console.error(error);
    }
};

/* export const createSuppliers = async() => {
    try {
        // Contador de estados (documentos en la DB)
        const count = await Supplier.estimatedDocumentCount();

        // Revisando la cantidad de estados
        if (count > 0) return;

        // Creando estados por defecto
        const values = await Promise.all([
            new Supplier({ name: 'ATHENDAT' }).save(),
            new Supplier({ name: 'PROFDAT' }).save(),
        ]);

        console.log('Suppliers Created!');
    } catch (error) {
        console.error(error);
    }
}; */

var createDeliveryMethods = exports.createDeliveryMethods = async function createDeliveryMethods() {
    try {
        // Contador de estados (documentos en la DB)
        var count = await _deliveryMethod2.default.estimatedDocumentCount();

        // Revisando la cantidad de estados
        if (count > 0) return;

        // Creando estados por defecto
        var values = await Promise.all([new _deliveryMethod2.default({ name: 'Recogida en el lugar' }).save(), new _deliveryMethod2.default({ name: 'Entrega a domicilio' }).save()]);

        //console.log('Delivery Methods Created!');
    } catch (error) {
        //console.error(error);
    }
};

var createUnits = exports.createUnits = async function createUnits() {
    try {
        // Contador de estados (documentos en la DB)
        var count = await _unit2.default.estimatedDocumentCount();

        // Revisando la cantidad de estados
        if (count > 0) return;

        // Creando estados por defecto
        var values = await Promise.all([new _unit2.default({
            name: 'Caja',
            initial: 'C'
        }).save(), new _unit2.default({
            name: 'Kilogramo',
            initial: 'kg'
        }).save(), new _unit2.default({
            name: 'Lata',
            initial: 'lt'
        }).save(), new _unit2.default({
            name: 'Libra',
            initial: 'lb'
        }).save(), new _unit2.default({
            name: 'Litro',
            initial: 'L'
        }).save(), new _unit2.default({
            name: 'Pomo',
            initial: 'Po'
        }).save(), new _unit2.default({
            name: 'Paquete',
            initial: 'Pqte'
        }).save(), new _unit2.default({
            name: 'Saco',
            initial: 'Sc'
        }).save(), new _unit2.default({
            name: 'Unidad',
            initial: 'U'
        }).save()]);

        //console.log('Units Created!');
    } catch (error) {
        //console.error(error);
    }
};