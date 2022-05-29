"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPageableRequest = void 0;
var createPageableRequest = function (request) { return ({
    limit: +request.limit,
    offset: +request.offset,
    page: +request.page,
}); };
exports.createPageableRequest = createPageableRequest;
