"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
var env_1 = require("../../../lib/config/env");
var cognito_1 = require("../../../lib/utils/cognito");
var getCognitoUrl = function () { return ({
    cognitoLoginUri: (0, cognito_1.composeCognitoUrl)(env_1.environment.cognito.domainName, env_1.environment.cognito.clientId, env_1.environment.cognito.redirectUri),
}); };
var cognitoRedirect = function (request) {
    console.log(123, request); // TODO: extract token and store in redis, create cognito middleware
    return 'success';
};
exports.authService = { getCognitoUrl: getCognitoUrl, cognitoRedirect: cognitoRedirect };
