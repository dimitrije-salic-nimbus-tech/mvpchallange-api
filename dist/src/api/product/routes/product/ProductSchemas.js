"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchemas = void 0;
var celebrate_1 = require("celebrate");
var createProductSchema = (_a = {},
    _a[celebrate_1.Segments.BODY] = celebrate_1.Joi.object().keys({
        name: celebrate_1.Joi.string().required(),
        price: celebrate_1.Joi.number().required(),
        amountAvailable: celebrate_1.Joi.number().required(),
    }),
    _a[celebrate_1.Segments.PARAMS] = celebrate_1.Joi.object().keys({
        userId: celebrate_1.Joi.string().uuid().required(),
    }),
    _a);
var getProductSchema = (_b = {},
    _b[celebrate_1.Segments.PARAMS] = celebrate_1.Joi.object().keys({
        id: celebrate_1.Joi.string().uuid().required(),
    }),
    _b);
var updateProductSchema = (_c = {},
    _c[celebrate_1.Segments.BODY] = celebrate_1.Joi.object().keys({
        name: celebrate_1.Joi.string().optional(),
        price: celebrate_1.Joi.number().optional(),
    }),
    _c[celebrate_1.Segments.PARAMS] = celebrate_1.Joi.object().keys({
        id: celebrate_1.Joi.string().uuid().required(),
    }),
    _c);
var buyProductSchema = (_d = {},
    _d[celebrate_1.Segments.PARAMS] = celebrate_1.Joi.object().keys({
        id: celebrate_1.Joi.string().uuid().required(),
    }),
    _d[celebrate_1.Segments.BODY] = celebrate_1.Joi.object().keys({
        products: celebrate_1.Joi.array().items(celebrate_1.Joi.object().keys({
            productId: celebrate_1.Joi.string().uuid().required(),
            amount: celebrate_1.Joi.number().required(),
        })),
    }),
    _d);
exports.productSchemas = {
    createProductSchema: createProductSchema,
    getProductSchema: getProductSchema,
    updateProductSchema: updateProductSchema,
    buyProductSchema: buyProductSchema,
};
