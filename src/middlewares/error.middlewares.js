"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function(err, req, res, next) {
    var httpStatus = err.status || 500;

    return res.status(httpStatus).send({
        status: httpStatus,
        message: err.message || "Error interno del servidor"
    });
};