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
exports.vendingMachineService = void 0;
var service_1 = require("../../user/service");
var shared_1 = require("../../../lib/exceptions/shared");
var repositories_1 = require("../../../lib/repositories");
var product_1 = require("../../../lib/utils/mapper/product");
var product_2 = require("../../../lib/exceptions/product");
var buyProduct = function (id, request) { return __awaiter(void 0, void 0, void 0, function () {
    var productRepository, user, totalSpent, depositLeft, i, _a, productId, amount, product, amountAvailable, price, products;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, repositories_1.getProductRepository)()];
            case 1:
                productRepository = _b.sent();
                return [4 /*yield*/, service_1.userService.getUser(id)];
            case 2:
                user = _b.sent();
                totalSpent = 0;
                depositLeft = user.deposit;
                i = 0;
                _b.label = 3;
            case 3:
                if (!(i < request.products.length)) return [3 /*break*/, 7];
                _a = request.products[i], productId = _a.productId, amount = _a.amount;
                return [4 /*yield*/, productRepository.findOne({ where: { id: productId }, relations: ['prices'] })];
            case 4:
                product = _b.sent();
                if (!product) {
                    throw new shared_1.ResourceNotFoundException();
                }
                amountAvailable = getAmountAvailable(product.amountAvailable, amount);
                price = getPrice(amount, product.prices, depositLeft);
                totalSpent += price;
                depositLeft -= price;
                return [4 /*yield*/, Promise.all([
                        service_1.userDepositService.changeDeposit(id, {
                            deposit: -price,
                        }),
                        productRepository.update(productId, { amountAvailable: amountAvailable }),
                    ])];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 3];
            case 7: return [4 /*yield*/, Promise.all(request.products.map(function (req) {
                    return productRepository.findOneOrFail({ where: { id: req.productId }, relations: ['prices', 'seller'] });
                }))];
            case 8:
                products = _b.sent();
                return [2 /*return*/, {
                        totalSpent: totalSpent,
                        depositLeft: depositLeft,
                        boughtProducts: (0, product_1.mapProductEntitiesToProductResponses)(products),
                    }];
        }
    });
}); };
exports.vendingMachineService = {
    buyProduct: buyProduct,
};
var getAmountAvailable = function (productCurrentAmount, amount) {
    var amountAvailable = productCurrentAmount - amount;
    if (amountAvailable < 0) {
        throw new product_2.NotEnoughProductAmount();
    }
    return amountAvailable;
};
var getPrice = function (amount, prices, currentDeposit) {
    var price = amount * (0, product_1.getCurrentPrice)(prices);
    if (currentDeposit < price) {
        throw new product_2.NotEnoughDeposit();
    }
    return price;
};
