"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeErrorPayload = void 0;
var composeErrorPayload = function (error) { return ({
    payload: {
        message: error.message,
    },
}); };
exports.composeErrorPayload = composeErrorPayload;
