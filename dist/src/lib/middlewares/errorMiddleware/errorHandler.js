"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var celebrate_1 = require("celebrate");
var constants_1 = require("../../utils/constants");
var user_1 = require("../../exceptions/user");
var product_1 = require("../../exceptions/product");
var shared_1 = require("../../exceptions/shared");
// @ts-ignore
var isBadRequest = function (exception) {
    return exception instanceof user_1.UserAlreadyExistsException ||
        exception instanceof product_1.ProductAlreadyExistsException ||
        exception instanceof product_1.NotEnoughProductAmount ||
        exception instanceof product_1.NotEnoughDeposit ||
        exception instanceof product_1.IncorrectPriceValueException ||
        exception instanceof celebrate_1.CelebrateError;
};
// @ts-ignore
var isNotFount = function (exception) { return exception instanceof shared_1.ResourceNotFoundException; };
// @ts-ignore
var createBadRequestError = function (exception) { return ({
    httpStatus: constants_1.BAD_REQUEST,
    message: exception === null || exception === void 0 ? void 0 : exception.message,
}); };
// @ts-ignore
var createNotFoundError = function (exception) { return ({
    httpStatus: constants_1.NOT_FOUND,
    message: exception === null || exception === void 0 ? void 0 : exception.message,
}); };
// @ts-ignore
var createInternalServerError = function (exception) { return ({
    httpStatus: constants_1.INTERNAL_SERVER_ERROR,
    message: constants_1.UNKNOWN_ERROR,
}); };
var errorHandler = function (err, req, res, next) {
    if (isBadRequest(err)) {
        res.status(400).send(createBadRequestError(err));
        return;
    }
    if (isNotFount(err)) {
        res.status(404).send(createNotFoundError(err));
        return;
    }
    console.log('Unknown error'); // TODO: add logger
    res.status(500).send(createInternalServerError(err));
};
exports.errorHandler = errorHandler;
