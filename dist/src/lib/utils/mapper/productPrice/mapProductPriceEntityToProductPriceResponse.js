"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapProductPriceEntitiesToProductPriceResponses = exports.mapProductPriceEntityToProductPriceResponse = void 0;
var ProductPriceResponse_1 = require("../../../../api/product/dto/response/ProductPriceResponse");
var ObjectMapper_1 = require("../ObjectMapper");
var mapProductPriceEntityToProductPriceResponse = function (price) {
    return (0, ObjectMapper_1.mapToClass)(price, ProductPriceResponse_1.ProductPriceResponse);
};
exports.mapProductPriceEntityToProductPriceResponse = mapProductPriceEntityToProductPriceResponse;
var mapProductPriceEntitiesToProductPriceResponses = function (prices) {
    return prices.map(exports.mapProductPriceEntityToProductPriceResponse);
};
exports.mapProductPriceEntitiesToProductPriceResponses = mapProductPriceEntitiesToProductPriceResponses;
