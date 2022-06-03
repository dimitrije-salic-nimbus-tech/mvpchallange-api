"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var service_1 = require("../../service");
var UserSchemas_1 = require("./UserSchemas");
var pagination_1 = require("../../../../lib/utils/validation/pagination");
var pagination_2 = require("../../../../lib/utils/mapper/pagination");
var router = (0, express_1.Router)();
router.post('/', [(0, celebrate_1.celebrate)(UserSchemas_1.userSchemas.createUserSchema)], function (req, res, next) {
    var body = req.body;
    service_1.userService
        .createUser(body)
        .then(function () { return res.status(201).send(); })
        .catch(next);
});
router.get('/', [(0, celebrate_1.celebrate)(pagination_1.queryPaginationSchemas.queryPagination)], function (req, res, next) {
    var query = req.query;
    service_1.userService
        .getUsers((0, pagination_2.createPageableRequest)(query))
        .then(function (users) { return res.send(users); })
        .catch(next);
});
router.get('/:id', [(0, celebrate_1.celebrate)(UserSchemas_1.userSchemas.getUserSchema)], function (req, res, next) {
    var params = req.params;
    service_1.userService
        .getUser(params.id)
        .then(function (user) { return res.send(user); })
        .catch(next);
});
router.patch('/:id', [(0, celebrate_1.celebrate)(UserSchemas_1.userSchemas.updateUserSchema)], function (req, res, next) {
    var body = req.body, params = req.params;
    service_1.userService
        .updateUser(params.id, body)
        .then(function () { return res.send(); })
        .catch(next);
});
router.delete('/:id', [(0, celebrate_1.celebrate)(UserSchemas_1.userSchemas.getUserSchema)], function (req, res, next) {
    var id = req.params.id;
    service_1.userService
        .deleteUser(id)
        .then(function () { return res.status(204).send(); })
        .catch(next);
});
router.post('/:id/add-deposit', [(0, celebrate_1.celebrate)(UserSchemas_1.userSchemas.addDepositSchema)], function (req, res, next) {
    var params = req.params, body = req.body;
    service_1.userDepositService
        .changeDeposit(params.id, body)
        .then(function (deposit) { return res.send(deposit); })
        .catch(next);
});
router.post('/:id/reset-deposit', [(0, celebrate_1.celebrate)(UserSchemas_1.userSchemas.getUserSchema)], function (req, res, next) {
    var id = req.params.id;
    service_1.userDepositService
        .resetDeposit(id)
        .then(function () { return res.send(); })
        .catch(next);
});
exports.default = router;
