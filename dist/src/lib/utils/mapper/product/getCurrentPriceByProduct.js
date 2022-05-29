"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentPriceByProduct = void 0;
var getCurrentPriceByProduct = function (prices) {
    // @ts-ignore
    var sorted = prices.sort(function (a, b) { return b.createdAt - a.createdAt; });
    return sorted[0].price;
};
exports.getCurrentPriceByProduct = getCurrentPriceByProduct;
