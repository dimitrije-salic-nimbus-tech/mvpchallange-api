"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToClass = void 0;
var class_transformer_1 = require("class-transformer");
var mapToClass = function (payload, toClass) {
    return (0, class_transformer_1.plainToClass)(toClass, payload, { strategy: 'excludeAll' });
};
exports.mapToClass = mapToClass;
