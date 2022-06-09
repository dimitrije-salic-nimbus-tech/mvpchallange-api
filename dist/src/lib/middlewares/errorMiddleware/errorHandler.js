"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var celebrate_1 = require("celebrate");
var constants_1 = require("../../utils/constants");
var user_1 = require("../../exceptions/user");
var product_1 = require("../../exceptions/product");
var shared_1 = require("../../exceptions/shared");
var shared_2 = require("../../exceptions/shared");
var cognito_1 = require("../../exceptions/cognito");
var auth_1 = require("../../exceptions/auth");
// @ts-ignore
var isBadRequest = function (exception) {
    return exception instanceof user_1.UserAlreadyExistsException ||
        exception instanceof product_1.ProductAlreadyExistsException ||
        exception instanceof product_1.NotEnoughProductAmount ||
        exception instanceof product_1.NotEnoughDeposit ||
        exception instanceof product_1.IncorrectPriceValueException ||
        exception instanceof cognito_1.CognitoException ||
        exception instanceof auth_1.UserAlreadyLoggedInException ||
        exception instanceof celebrate_1.CelebrateError;
};
// @ts-ignore
var isNotFount = function (exception) { return exception instanceof shared_1.ResourceNotFoundException; };
var isUnauthorized = function (exception) { return exception instanceof shared_2.UnauthorizedException; };
var isNotAllowed = function (exception) { return exception instanceof shared_1.MethodNotAllowedException; };
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
// @ts-ignore
var createUnauthorizedError = function (exception) { return ({
    httpStatus: constants_1.UNAUTHORIZED,
    message: exception === null || exception === void 0 ? void 0 : exception.message,
}); };
// @ts-ignore
var createNotAllowedError = function (exception) { return ({
    httpStatus: constants_1.NOT_ALLOWED,
    message: exception === null || exception === void 0 ? void 0 : exception.message,
}); };
var errorHandler = function (err, req, res, next) {
    if (isBadRequest(err)) {
        res.status(400).send(createBadRequestError(err));
        return;
    }
    if (isUnauthorized(err)) {
        res.status(401).send(createUnauthorizedError(err));
        return;
    }
    if (isNotAllowed(err)) {
        res.status(403).send(createNotAllowedError(err));
        return;
    }
    if (isNotFount(err)) {
        res.status(404).send(createNotFoundError(err));
        return;
    }
    console.log('Unknown error', err); // TODO: add logger
    res.status(500).send(createInternalServerError(err));
};
exports.errorHandler = errorHandler;
