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
exports.NotEnoughDeposit = void 0;
var BaseException_1 = require("../BaseException");
var constants_1 = require("../../utils/constants");
var NotEnoughDeposit = /** @class */ (function (_super) {
    __extends(NotEnoughDeposit, _super);
    function NotEnoughDeposit() {
        return _super.call(this, constants_1.BAD_REQUEST, constants_1.NOT_ENOUGH_DEPOSIT) || this;
    }
    return NotEnoughDeposit;
}(BaseException_1.BaseException));
exports.NotEnoughDeposit = NotEnoughDeposit;
