"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeCognitoOauthUrl = exports.composeCognitoUrl = void 0;
var composeCognitoUrl = function (domainName, clientId, redirectUri, region, responseType) {
    return "https://".concat(domainName, ".auth.").concat(region, ".amazoncognito.com/login?response_type=").concat(responseType, "&client_id=").concat(clientId, "&redirect_uri=").concat(redirectUri);
};
exports.composeCognitoUrl = composeCognitoUrl;
var composeCognitoOauthUrl = function (domainName, region) {
    return "https://".concat(domainName, ".auth.").concat(region, ".amazoncognito.com/oauth2/token");
};
exports.composeCognitoOauthUrl = composeCognitoOauthUrl;
