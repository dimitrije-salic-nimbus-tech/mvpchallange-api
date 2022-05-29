"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentPrice = void 0;
var getCurrentPrice = function (prices) {
    // @ts-ignore
    return prices.sort(function (a, b) { return b.createdAt - a.createdAt; })[0].price;
};
exports.getCurrentPrice = getCurrentPrice;
