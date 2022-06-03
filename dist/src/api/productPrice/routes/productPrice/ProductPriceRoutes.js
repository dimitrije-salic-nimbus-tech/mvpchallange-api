"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var service_1 = require("../../service");
var pagination_1 = require("../../../../lib/utils/mapper/pagination");
var ProductPricesSchemas_1 = require("./ProductPricesSchemas");
var router = (0, express_1.Router)();
router.get('/:id/user', [(0, celebrate_1.celebrate)(ProductPricesSchemas_1.productPriceSchemas.getPricesHistoryByProductSchema)], function (req, res, next) {
    var query = req.query, params = req.params;
    service_1.productPriceService
        .getPriceHistoryByProduct(params.id, (0, pagination_1.createPageableRequest)(query))
        .then(function (prices) { return res.send(prices); })
        .catch(next);
});
exports.default = router;
