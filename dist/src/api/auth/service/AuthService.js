"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
var env_1 = require("../../../lib/config/env");
var cognito_1 = require("../../../lib/utils/cognito");
var CacheService_1 = require("./CacheService");
var enums_1 = require("../../../lib/shared/enums");
var getCognitoUrl = function () { return ({
    cognitoLoginUri: (0, cognito_1.composeCognitoUrl)(env_1.environment.cognito.domainName, env_1.environment.cognito.clientId, env_1.environment.cognito.redirectUri),
}); };
// @ts-ignore
var cognitoRedirect = function (req) {
    console.log(854, req.query);
    console.log(534, req);
    return 'success';
};
var storeCognitoToken = function (token, username) {
    return CacheService_1.cacheService.store("".concat(enums_1.CacheKeyEnum.USER_SESSION, "_").concat(username), token);
};
exports.authService = { getCognitoUrl: getCognitoUrl, cognitoRedirect: cognitoRedirect, storeCognitoToken: storeCognitoToken };
