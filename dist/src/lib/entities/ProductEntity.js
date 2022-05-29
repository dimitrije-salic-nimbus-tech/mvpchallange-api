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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductEntity = void 0;
var typeorm_1 = require("typeorm");
var class_transformer_1 = require("class-transformer");
var BaseEntity_1 = require("./BaseEntity");
var UserEntity_1 = require("./UserEntity");
var ProductPriceEntity_1 = require("./ProductPriceEntity");
var ProductEntity = /** @class */ (function (_super) {
    __extends(ProductEntity, _super);
    function ProductEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, typeorm_1.Column)({ unique: true }),
        __metadata("design:type", String)
    ], ProductEntity.prototype, "name", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], ProductEntity.prototype, "amountAvailable", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ProductEntity.prototype, "sellerId", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, typeorm_1.ManyToOne)(function () { return UserEntity_1.UserEntity; }, function (user) { return user.myProducts; }, { onDelete: 'CASCADE' }),
        __metadata("design:type", UserEntity_1.UserEntity)
    ], ProductEntity.prototype, "seller", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, typeorm_1.OneToMany)(function () { return ProductPriceEntity_1.ProductPriceEntity; }, function (productPrice) { return productPrice.product; }),
        __metadata("design:type", Array)
    ], ProductEntity.prototype, "prices", void 0);
    ProductEntity = __decorate([
        (0, typeorm_1.Entity)({ name: 'product' })
    ], ProductEntity);
    return ProductEntity;
}(BaseEntity_1.BaseEntity));
exports.ProductEntity = ProductEntity;
