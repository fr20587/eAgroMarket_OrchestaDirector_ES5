"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteProductById = exports.updateProductById = exports.getProductsByCategory = exports.getProductById = exports.getProducts = exports.createProduct = undefined;

var _slicedToArray = function() {
    function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true;
            _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // Models


var _product = require("../models/product.model");

var _product2 = _interopRequireDefault(_product);

var _brand = require("../models/brand.model");

var _brand2 = _interopRequireDefault(_brand);

var _category = require("../models/category.model");

var _category2 = _interopRequireDefault(_category);

var _supplier = require("../models/supplier.model");

var _supplier2 = _interopRequireDefault(_supplier);

var _ingredients = require("../models/ingredients.model");

var _ingredients2 = _interopRequireDefault(_ingredients);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// API REST para gestión de productos. CRUD
// Crear nuevo producto -- Crud
var createProduct = exports.createProduct = async function createProduct(req, res) {
    var _req$body = req.body;
    var name = _req$body.name;
    var cost = _req$body.cost;
    var price = _req$body.price;
    var discount = _req$body.discount;
    var unit = _req$body.unit;
    var shortDetails = _req$body.shortDetails;
    var ingredients = _req$body.ingredients;
    var description = _req$body.description;
    var img = _req$body.img;
    var stock = _req$body.stock;
    var newItem = _req$body.newItem;
    var newSupplier = _req$body.newSupplier;
    var supplier = _req$body.supplier;
    var brand = _req$body.brand;
    var category = _req$body.category;
    var onSale = _req$body.onSale;
    var rate = _req$body.rate;


    try {

        var newProduct = new _product2.default({
            user: req.userId,
            name: name,
            cost: cost,
            price: price,
            discount: discount,
            unit: unit,
            shortDetails: shortDetails,
            ingredients: ingredients,
            description: description,
            img: img,
            stock: stock,
            newItem: newItem,
            newSupplier: newSupplier,
            supplier: supplier,
            brand: brand,
            category: category,
            onSale: onSale,
            rate: rate
        });

        // Relacionando marca con el producto
        var foundBrand = await _brand2.default.find({ name: { $in: brand } });
        newProduct.brandId = foundBrand.map(function(brand) {
            return brand._id;
        });

        // Relacionando categoria con el producto
        var foundCategory = await _category2.default.find({ name: { $in: category } });
        newProduct.categoryId = foundCategory.map(function(category) {
            return category._id;
        });

        // Relacionando proveedor con el producto
        var foundSupplier = await _supplier2.default.find({ name: { $in: supplier } });
        newProduct.supplierId = foundSupplier.map(function(supplier) {
            return supplier._id;
        });

        // Relacionando ingredientes con el producto
        var foundIngredient = await _ingredients2.default.find({ name: { $in: ingredients } });
        newProduct.ingredientsId = foundIngredient.map(function(ingredients) {
            return [ingredients._id];
        });

        await newProduct.save();

        res.status(201).json({
            ok: true,
            message: 'Producto creado correctamente',
            product: newProduct
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            messages: 'No se ha podido crear el producto en la DB'
        });
    }
};

// Obtener todos los productos -- cRud
/* export const getProducts = async(req, res) => {
    const products = await Product.find();
    res.json(products);
} */

var getProducts = exports.getProducts = async function getProducts(req, res) {
    var _req$query = req.query;
    var pageSize = _req$query.pageSize;
    var pageNum = _req$query.pageNum;
    var sort = _req$query.sort;

    var _ref = await Promise.all([_product2.default.find().populate('categoryId', 'name img').populate('brandId', 'name img').populate('supplierId', 'name img').populate('ingredientId', 'name img').populate('tagsId', 'name').populate('colorsId', 'name').populate('userId', 'name img').sort({ name: 1 }).skip(pageSize * pageNum - pageSize).limit(pageSize), _product2.default.countDocuments()]);

    var _ref2 = _slicedToArray(_ref, 2);

    var data = _ref2[0];
    var count = _ref2[1];


    var pages = Math.ceil(count / pageSize);

    res.status(200).json({
        ok: true,
        pages: pages,
        pageNum: pageNum,
        pageSize: pageSize,
        total: count,
        products: data
    });
};

// Obtener un producto -- cRud
var getProductById = exports.getProductById = async function getProductById(req, res) {
    var id = req.params.id;

    try {
        var product = await _product2.default.findById(id).populate('category', 'name img').populate('user', 'name img');
        //.populate('brand', 'name img')
        //.populate('ingredient', 'name img')
        //.populate('supplier', 'name img')

        res.status(200).json({
            ok: true,
            product: product
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            messages: 'Error inesperado.'
        });
    }
};

// Obtener todos los productos por categorias -- cRud
var getProductsByCategory = exports.getProductsByCategory = async function getProductsByCategory(req, res) {
    var categoryId = req.params.categoryId;

    var _req$query2 = req.query;
    var pageSize = _req$query2.pageSize;
    var pageNum = _req$query2.pageNum;

    var _ref3 = await Promise.all([_product2.default.find({
        categoryId: categoryId
    }).populate('categoryId', 'name img').populate('brandId', 'name img').populate('supplierId', 'name img').populate('ingredientId', 'name img').populate('tagsId', 'name').populate('colorsId', 'name').populate('userId', 'name img').skip(pageSize * pageNum - pageSize).limit(pageSize), _product2.default.countDocuments({ categoryId: categoryId })]);

    var _ref4 = _slicedToArray(_ref3, 2);

    var data = _ref4[0];
    var count = _ref4[1];


    var pages = Math.ceil(count / pageSize);

    res.status(200).json({
        pages: pages,
        pageNum: pageNum,
        pageSize: pageSize,
        count: count,
        data: data
    });
};

// Editar producto -- crUd
var updateProductById = exports.updateProductById = async function updateProductById(req, res) {
    var id = req.params.id;
    var _req$body2 = req.body;
    var name = _req$body2.name;
    var price = _req$body2.price;

    try {
        var updatedProduct = await _product2.default.findByIdAndUpdate(id, { name: name, price: price }, {
            new: true
        });
        res.status(200).json({
            ok: true,
            messages: 'Producto actualizado correctamente',
            product: updatedProduct
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            messages: 'Error inesperado.'
        });
    }
};

// Eliminar producto -- cruD
var deleteProductById = exports.deleteProductById = async function deleteProductById(req, res) {
    var id = req.params.id;

    try {
        await _product2.default.findByIdAndDelete(id);
        res.status(200).json({
            ok: true,
            messages: 'Producto eliminado correctamente'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            messages: 'Error inesperado.'
        });
    }
};