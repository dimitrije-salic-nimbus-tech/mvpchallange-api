"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseRepository = void 0;
var typeorm_1 = require("typeorm");
var getBaseRepository = function () { return (0, typeorm_1.getManager)('mvpmatch'); };
exports.getBaseRepository = getBaseRepository;
