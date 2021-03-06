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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
var qs_1 = __importDefault(require("qs"));
var axios_1 = __importDefault(require("axios"));
var repositories_1 = require("../../../lib/repositories");
var user_1 = require("../../../lib/exceptions/user");
var UserEntity_1 = require("../../../lib/entities/UserEntity");
var mapper_1 = require("../../../lib/utils/mapper");
var CacheService_1 = require("./CacheService");
var enums_1 = require("../../../lib/shared/enums");
var service_1 = require("../../user/service");
var cognito_1 = require("../../../lib/exceptions/cognito");
var env_1 = require("../../../lib/config/env");
var cognito_2 = require("../../../lib/utils/cognito");
var cognito_3 = require("../../../lib/config/cognito");
var shared_1 = require("../../../lib/exceptions/shared");
var auth_1 = require("../../../lib/exceptions/auth");
var userRegistration = function (request) { return __awaiter(void 0, void 0, void 0, function () {
    var username, role, userRepository, userExists, userForCreate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = request.username, role = request.role;
                return [4 /*yield*/, (0, repositories_1.getUserRepository)()];
            case 1:
                userRepository = _a.sent();
                return [4 /*yield*/, userRepository.findOne({ where: { username: username } })];
            case 2:
                userExists = _a.sent();
                if (userExists) {
                    throw new user_1.UserAlreadyExistsException();
                }
                userForCreate = (0, mapper_1.mapToClass)({ username: username, role: role }, UserEntity_1.UserEntity);
                return [2 /*return*/, userRepository.save(userForCreate).then(function () { return Promise.resolve(); })];
        }
    });
}); };
var login = function (code) { return __awaiter(void 0, void 0, void 0, function () {
    var oauthRequest, oauthResponse, cognitoValidatedResponse, err_1, username, exists, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!code) {
                    throw new cognito_1.CognitoException();
                }
                oauthRequest = {
                    grant_type: 'authorization_code',
                    code: code.toString(),
                    client_id: env_1.environment.cognito.clientId,
                    redirect_uri: env_1.environment.cognito.redirectUri,
                };
                return [4 /*yield*/, (0, axios_1.default)({
                        method: 'post',
                        url: (0, cognito_2.composeCognitoOauthUrl)(env_1.environment.cognito.domainName, env_1.environment.cognito.region),
                        data: qs_1.default.stringify(oauthRequest),
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                        },
                    }).then(function (res) { return res.data; })];
            case 1:
                oauthResponse = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, cognito_3.cognitoExpress.validate(oauthResponse.access_token)];
            case 3:
                cognitoValidatedResponse = _a.sent();
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                throw new shared_1.UnauthorizedException();
            case 5:
                username = cognitoValidatedResponse.username;
                return [4 /*yield*/, CacheService_1.cacheService.get("".concat(enums_1.CacheKeyEnum.USER_SESSION, "_").concat(username))];
            case 6:
                exists = _a.sent();
                if (exists) {
                    throw new auth_1.UserAlreadyLoggedInException();
                }
                return [4 /*yield*/, service_1.userService.getUserByUsername(username)];
            case 7:
                user = _a.sent();
                return [2 /*return*/, storeCognitoToken(oauthResponse.access_token, username).then(function () { return ({
                        accesstoken: oauthResponse.access_token,
                        user: user,
                    }); })];
        }
    });
}); };
var logout = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, service_1.userService.getUser(id)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, CacheService_1.cacheService.remove("".concat(enums_1.CacheKeyEnum.USER_SESSION, "_").concat(user.username)).then(function () { return Promise.resolve(); })];
        }
    });
}); };
exports.authService = {
    userRegistration: userRegistration,
    login: login,
    logout: logout,
};
var storeCognitoToken = function (token, username) {
    return CacheService_1.cacheService.store("".concat(enums_1.CacheKeyEnum.USER_SESSION, "_").concat(username), token);
};
