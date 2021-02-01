"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var parseIntMiddleware = exports.parseIntMiddleware = function parseIntMiddleware(req, res, next) {
    var queryStrings = req.query;
    for (var key in queryStrings) {
        var length = queryStrings[key].length;
        var isValid = length > 20 ? false : !isNaN(parseInt(queryStrings[key]));

        if (isValid) {
            queryStrings[key] = parseInt(queryStrings[key]);
        }
    }

    req.query = queryStrings;
    next();
};