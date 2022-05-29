"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPriceSchemas = exports.productPriceRoutes = void 0;
var ProductPriceRoutes_1 = __importDefault(require("./ProductPriceRoutes"));
exports.productPriceRoutes = ProductPriceRoutes_1.default;
var ProductPricesSchemas_1 = require("./ProductPricesSchemas");
Object.defineProperty(exports, "productPriceSchemas", { enumerable: true, get: function () { return ProductPricesSchemas_1.productPriceSchemas; } });
