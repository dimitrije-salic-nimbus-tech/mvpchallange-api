"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapProductEntitiesToProductResponses = exports.mapProductEntityToProductResponse = void 0;
var response_1 = require("../../../../api/product/dto/response");
var ObjectMapper_1 = require("../ObjectMapper");
var getCurrentPrice_1 = require("./getCurrentPrice");
var mapProductEntityToProductResponse = function (product) {
    var productResponse = (0, ObjectMapper_1.mapToClass)(product, response_1.ProductResponse);
    productResponse.currentPrice = (0, getCurrentPrice_1.getCurrentPrice)(product.prices);
    return productResponse;
};
exports.mapProductEntityToProductResponse = mapProductEntityToProductResponse;
var mapProductEntitiesToProductResponses = function (products) {
    return products.map(exports.mapProductEntityToProductResponse);
};
exports.mapProductEntitiesToProductResponses = mapProductEntitiesToProductResponses;
