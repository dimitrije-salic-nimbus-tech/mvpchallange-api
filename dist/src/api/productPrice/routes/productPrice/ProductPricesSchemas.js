"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPriceSchemas = void 0;
var celebrate_1 = require("celebrate");
var pagination_1 = require("../../../pagination");
var getPricesHistoryByProductSchema = __assign((_a = {}, _a[celebrate_1.Segments.PARAMS] = celebrate_1.Joi.object().keys({
    id: celebrate_1.Joi.string().uuid().required(),
}), _a), pagination_1.queryPaginationSchemas.queryPagination);
exports.productPriceSchemas = {
    getPricesHistoryByProductSchema: getPricesHistoryByProductSchema,
};
