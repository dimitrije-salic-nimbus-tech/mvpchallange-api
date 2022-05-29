"use strict";
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemas = void 0;
var celebrate_1 = require("celebrate");
var enums_1 = require("../../../../lib/enums");
var validation_1 = require("../../../../lib/utils/validation");
var createUserSchema = (_a = {},
    _a[celebrate_1.Segments.BODY] = celebrate_1.Joi.object().keys({
        username: celebrate_1.Joi.string().required(),
        role: (_b = celebrate_1.Joi.string())
            .valid.apply(_b, Object.values(enums_1.RoleEnum)).required(),
    }),
    _a);
var getUserSchema = (_c = {},
    _c[celebrate_1.Segments.PARAMS] = celebrate_1.Joi.object().keys({
        id: celebrate_1.Joi.string().uuid().required(),
    }),
    _c);
var updateUserSchema = (_d = {},
    _d[celebrate_1.Segments.PARAMS] = celebrate_1.Joi.object().keys({
        id: celebrate_1.Joi.string().uuid().required(),
    }),
    _d[celebrate_1.Segments.BODY] = celebrate_1.Joi.object().keys({
        username: celebrate_1.Joi.string().optional(),
    }),
    _d);
var addDepositSchema = (_e = {},
    _e[celebrate_1.Segments.PARAMS] = celebrate_1.Joi.object().keys({
        id: celebrate_1.Joi.string().uuid().required(),
    }),
    _e[celebrate_1.Segments.BODY] = celebrate_1.Joi.object().keys({
        deposit: (_f = celebrate_1.Joi.number()).valid.apply(_f, validation_1.VALID_COINS).required(),
    }),
    _e);
exports.userSchemas = {
    createUserSchema: createUserSchema,
    getUserSchema: getUserSchema,
    updateUserSchema: updateUserSchema,
    addDepositSchema: addDepositSchema,
};
