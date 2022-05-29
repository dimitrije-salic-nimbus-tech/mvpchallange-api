"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordsDontMatchException = void 0;
var BaseException_1 = require("../BaseException");
var PasswordsDontMatchException = /** @class */ (function (_super) {
    __extends(PasswordsDontMatchException, _super);
    function PasswordsDontMatchException() {
        return _super.call(this, 'BAD_REQUEST', "Passwords for user do not match") || this;
    }
    return PasswordsDontMatchException;
}(BaseException_1.BaseException));
exports.PasswordsDontMatchException = PasswordsDontMatchException;
