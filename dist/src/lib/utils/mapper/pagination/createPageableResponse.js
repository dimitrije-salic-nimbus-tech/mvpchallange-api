"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPageableResponse = void 0;
var createPageableResponse = function (items, limit, count, page) { return ({
    items: items,
    totalPages: Math.ceil(count / limit),
    page: page,
}); };
exports.createPageableResponse = createPageableResponse;
