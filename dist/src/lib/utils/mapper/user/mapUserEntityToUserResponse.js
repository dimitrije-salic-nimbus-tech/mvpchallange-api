"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserEntitiesToUserResponses = exports.mapUserEntityToUserResponse = void 0;
var response_1 = require("../../../../api/user/dto/response");
var ObjectMapper_1 = require("../ObjectMapper");
var mapUserEntityToUserResponse = function (user) {
    return (0, ObjectMapper_1.mapToClass)(user, response_1.UserResponse);
};
exports.mapUserEntityToUserResponse = mapUserEntityToUserResponse;
var mapUserEntitiesToUserResponses = function (users) {
    return users.map(exports.mapUserEntityToUserResponse);
};
exports.mapUserEntitiesToUserResponses = mapUserEntitiesToUserResponses;
