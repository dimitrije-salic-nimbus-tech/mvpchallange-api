"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRoutes = void 0;
var user_1 = require("../../api/user/routes/user");
var product_1 = require("../../api/product/routes/product");
var productPrice_1 = require("../../api/product/routes/productPrice");
var errorMiddleware_1 = require("../middlewares/errorMiddleware");
var routes_1 = require("../../api/auth/routes");
var authMiddleware_1 = require("../middlewares/authMiddleware");
var configureRoutes = function (app) {
    app.use(authMiddleware_1.auth);
    app.use('/api/users', user_1.userRoutes);
    app.use('/api/products', product_1.productRoutes);
    app.use('/api/user-prices', productPrice_1.productPriceRoutes);
    app.use('/api/cognito', routes_1.cognitoRoutes);
    app.use('/api/auth', routes_1.authRoutes);
    app.use(errorMiddleware_1.errorHandler);
};
exports.configureRoutes = configureRoutes;
