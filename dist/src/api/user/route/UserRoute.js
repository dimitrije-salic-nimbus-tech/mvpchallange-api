"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var service_1 = require("../service");
var enums_1 = require("../../../lib/enums");
var router = (0, express_1.Router)();
var createUserSchema = (_a = {},
    _a[celebrate_1.Segments.BODY] = celebrate_1.Joi.object().keys({
        username: celebrate_1.Joi.string().required(),
        role: (_b = celebrate_1.Joi.string())
            .valid.apply(_b, Object.values(enums_1.RoleEnum)).required(),
    }),
    _a);
var getUserSchema = (_c = {},
    _c[celebrate_1.Segments.PARAMS] = celebrate_1.Joi.object().keys({
        id: celebrate_1.Joi.string().uuid().required(),
    }),
    _c);
var getUsersByRoleSchema = (_d = {},
    _d[celebrate_1.Segments.QUERY] = celebrate_1.Joi.object().keys({
        role: (_e = celebrate_1.Joi.string()).valid.apply(_e, Object.values(enums_1.RoleEnum)),
    }),
    _d);
router.post('/', [(0, celebrate_1.celebrate)(createUserSchema)], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                return [4 /*yield*/, service_1.userService.createUser(body)];
            case 1:
                _a.sent();
                res.status(201).send();
                return [2 /*return*/];
        }
    });
}); });
router.get('/', [(0, celebrate_1.celebrate)(getUserSchema)], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var params, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = req.params;
                return [4 /*yield*/, service_1.userService.getUser(params.id)];
            case 1:
                user = _a.sent();
                res.send(user);
                return [2 /*return*/];
        }
    });
}); });
router.get('/', [], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, service_1.userService.getUsers()];
            case 1:
                users = _a.sent();
                res.send(users);
                return [2 /*return*/];
        }
    });
}); });
router.get('/', [(0, celebrate_1.celebrate)(getUsersByRoleSchema)], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = req.query;
                return [4 /*yield*/, service_1.userService.getUsersByRole(query.role)];
            case 1:
                users = _a.sent();
                res.send(users);
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
