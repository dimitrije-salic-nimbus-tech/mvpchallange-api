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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
var repositories_1 = require("../../../lib/repositories");
var product_1 = require("../../../lib/exceptions/product");
var ProductEntity_1 = require("../../../lib/entities/ProductEntity");
var mapper_1 = require("../../../lib/utils/mapper");
var service_1 = require("../../user/service");
var ProductPriceService_1 = require("./ProductPriceService");
var product_2 = require("../../../lib/utils/mapper/product");
var shared_1 = require("../../../lib/exceptions/shared");
var pagination_1 = require("../../../lib/utils/mapper/pagination");
var product_3 = require("../../../lib/exceptions/product");
var createProduct = function (id, request) { return __awaiter(void 0, void 0, void 0, function () {
    var name, price, amountAvailable, productRepository, productExists, seller, productForCreate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = request.name, price = request.price, amountAvailable = request.amountAvailable;
                if (price % 5 !== 0) {
                    throw new product_3.IncorrectPriceValueException();
                }
                return [4 /*yield*/, (0, repositories_1.getProductRepository)()];
            case 1:
                productRepository = _a.sent();
                return [4 /*yield*/, productRepository.findOne({ where: { name: name } })];
            case 2:
                productExists = _a.sent();
                if (productExists) {
                    throw new product_1.ProductAlreadyExistsException();
                }
                return [4 /*yield*/, service_1.userService.getUser(id)];
            case 3:
                seller = _a.sent();
                productForCreate = (0, mapper_1.mapToClass)({ name: name, amountAvailable: amountAvailable, sellerId: seller.id }, ProductEntity_1.ProductEntity);
                return [2 /*return*/, productRepository
                        .save(productForCreate)
                        .then(function (product) { return ProductPriceService_1.productPriceService.createProductPrice(price, product); })];
        }
    });
}); };
var getProduct = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var productRepository, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, repositories_1.getProductRepository)()];
            case 1:
                productRepository = _a.sent();
                return [4 /*yield*/, productRepository.findOne({ where: { id: id }, relations: ['seller', 'prices'] })];
            case 2:
                product = _a.sent();
                if (!product) {
                    throw new shared_1.ResourceNotFoundException();
                }
                return [2 /*return*/, (0, product_2.mapProductEntityToProductResponse)(product)];
        }
    });
}); };
var getProducts = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var offset, limit, page, productRepository, _a, items, count;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                offset = query.offset, limit = query.limit, page = query.page;
                return [4 /*yield*/, (0, repositories_1.getProductRepository)()];
            case 1:
                productRepository = _b.sent();
                return [4 /*yield*/, productRepository
                        .createQueryBuilder('product')
                        .leftJoinAndSelect('product.prices', 'prices')
                        .leftJoinAndSelect('product.seller', 'seller')
                        .skip(offset)
                        .take(limit)
                        .getManyAndCount()];
            case 2:
                _a = _b.sent(), items = _a[0], count = _a[1];
                return [2 /*return*/, (0, pagination_1.createPageableResponse)((0, product_2.mapProductEntitiesToProductResponses)(items), limit, count, page)];
        }
    });
}); };
var updateProduct = function (id, request) { return __awaiter(void 0, void 0, void 0, function () {
    var productRepository, product, productExists;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, repositories_1.getProductRepository)()];
            case 1:
                productRepository = _a.sent();
                return [4 /*yield*/, productRepository.findOne({ where: { id: id }, relations: ['prices'] })];
            case 2:
                product = _a.sent();
                if (!product) {
                    throw new shared_1.ResourceNotFoundException();
                }
                if (!request.name) return [3 /*break*/, 5];
                return [4 /*yield*/, productRepository.findOne({ where: { name: request.name } })];
            case 3:
                productExists = _a.sent();
                if (productExists) {
                    throw new product_1.ProductAlreadyExistsException();
                }
                return [4 /*yield*/, productRepository.update(id, { name: request.name })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                if (!request.price) return [3 /*break*/, 7];
                if (request.price < 0 || request.price === (0, product_2.getCurrentPrice)(product.prices)) {
                    throw new product_3.IncorrectPriceValueException(); // TODO: use decorator
                }
                return [4 /*yield*/, ProductPriceService_1.productPriceService.createProductPrice(request.price, product)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/, Promise.resolve()];
        }
    });
}); };
var deleteProduct = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var productRepository;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, repositories_1.getProductRepository)()];
            case 1:
                productRepository = _a.sent();
                return [2 /*return*/, productRepository.delete(id).then(function () { return Promise.resolve(); })];
        }
    });
}); };
exports.productService = {
    createProduct: createProduct,
    getProduct: getProduct,
    getProducts: getProducts,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
};
