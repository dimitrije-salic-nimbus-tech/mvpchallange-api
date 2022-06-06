"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var user_1 = require("../../user/routes/user");
var service_1 = require("../service");
var router = (0, express_1.Router)();
router.post('/registration', [(0, celebrate_1.celebrate)(user_1.userSchemas.createUserSchema)], function (req, res, next) {
    var body = req.body;
    service_1.authService
        .userRegistration(body)
        .then(function () { return res.status(201).send(); })
        .catch(next);
});
exports.default = router;
