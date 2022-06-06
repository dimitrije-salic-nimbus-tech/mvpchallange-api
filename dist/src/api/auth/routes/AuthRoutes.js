"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var service_1 = require("../service");
var router = (0, express_1.Router)();
router.get('', function (req, res) { return res.send(service_1.authService.getCognitoUrl()); });
router.get('/redirect-uri', function (req, res) { return res.send(service_1.authService.cognitoRedirect(req)); });
exports.default = router;
