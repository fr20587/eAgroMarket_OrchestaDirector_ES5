"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function(req, res, next) {
    return res.status(404).send({ status: 404, message: "Recurso no encontrado" });
};

;