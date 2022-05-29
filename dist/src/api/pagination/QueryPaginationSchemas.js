"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryPaginationSchemas = void 0;
var celebrate_1 = require("celebrate");
var queryPagination = (_a = {},
    _a[celebrate_1.Segments.QUERY] = celebrate_1.Joi.object().keys({
        offset: celebrate_1.Joi.string().optional().default('0'),
        limit: celebrate_1.Joi.string().optional().default('8'),
        page: celebrate_1.Joi.string().optional().default('1'),
    }),
    _a);
exports.queryPaginationSchemas = {
    queryPagination: queryPagination,
};
