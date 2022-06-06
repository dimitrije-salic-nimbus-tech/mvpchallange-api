"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeCognitoUrl = void 0;
var composeCognitoUrl = function (domainName, clientId, redirectUri, region) {
    return "https://".concat(domainName, ".auth.").concat(region, ".amazoncognito.com/login?response_type=token&client_id=").concat(clientId, "&redirect_uri=").concat(redirectUri);
};
exports.composeCognitoUrl = composeCognitoUrl;
