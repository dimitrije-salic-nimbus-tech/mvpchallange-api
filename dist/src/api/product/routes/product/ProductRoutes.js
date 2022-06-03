"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var celebrate_1 = require("celebrate");
var express_1 = require("express");
var ProductSchemas_1 = require("./ProductSchemas");
var service_1 = require("../../service");
var pagination_1 = require("../../../../lib/utils/validation/pagination");
var pagination_2 = require("../../../../lib/utils/mapper/pagination");
var router = (0, express_1.Router)();
router.post('/:id/user', [(0, celebrate_1.celebrate)(ProductSchemas_1.productSchemas.createProductSchema)], function (req, res, next) {
    var body = req.body, params = req.params;
    service_1.productService
        .createProduct(params.id, body)
        .then(function () { return res.status(201).send(); })
        .catch(next);
});
router.get('/', [(0, celebrate_1.celebrate)(pagination_1.queryPaginationSchemas.queryPagination)], function (req, res, next) {
    var query = req.query;
    service_1.productService
        .getProducts((0, pagination_2.createPageableRequest)(query))
        .then(function (products) { return res.send(products); })
        .catch(next);
});
router.get('/:id', [(0, celebrate_1.celebrate)(ProductSchemas_1.productSchemas.getProductSchema)], function (req, res, next) {
    var params = req.params;
    service_1.productService
        .getProduct(params.id)
        .then(function (product) { return res.send(product); })
        .catch(next);
});
router.patch('/:id', [(0, celebrate_1.celebrate)(ProductSchemas_1.productSchemas.updateProductSchema)], function (req, res, next) {
    var params = req.params, body = req.body;
    service_1.productService
        .updateProduct(params.id, body)
        .then(function () { return res.send(); })
        .catch(next);
});
router.delete('/:id', [(0, celebrate_1.celebrate)(ProductSchemas_1.productSchemas.getProductSchema)], function (req, res, next) {
    var id = req.params.id;
    service_1.productService
        .deleteProduct(id)
        .then(function () { return res.status(204).send(); })
        .catch(next);
});
router.post('/buy/:id/user', [(0, celebrate_1.celebrate)(ProductSchemas_1.productSchemas.buyProductSchema)], function (req, res, next) {
    var params = req.params, body = req.body;
    service_1.vendingMachineService
        .buyProduct(params.id, body)
        .then(function (response) { return res.send(response); })
        .catch(next);
});
exports.default = router;
