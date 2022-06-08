"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
var dotenv = __importStar(require("dotenv"));
dotenv.config({
    path: "".concat(__dirname, "/../../../../.env.").concat(process.env.NODE_ENV),
});
exports.environment = {
    env: process.env.NODE_ENV || 'dev',
    port: +(process.env.SERVICE_PORT || 3010),
    salt: +(process.env.SALT || 10),
    serviceName: process.env.SERVICE_NAME || 'MvpMatch',
    database: {
        host: process.env.POSTGRES_HOST || 'localhost',
        name: process.env.POSTGRES_DB_NAME || 'Enter your DB name',
        password: process.env.POSTGRES_PASSWORD || 'Enter your DB password!',
        port: +(process.env.POSTGRES_PORT || 5432),
        user: process.env.POSTGRES_USER || 'Enter your DB username!',
    },
    cognito: {
        domainName: process.env.AUTH_DOMAIN || 'Enter your domain name',
        clientId: process.env.CLIENT_ID || 'Enter your client id',
        redirectUri: process.env.REDIRECT_URI || 'Enter your redirect uri',
        poolId: process.env.POOL_ID || 'Enter your pool id',
        region: process.env.REGION || 'Enter region',
        tokenUse: process.env.TOKEN_USE || 'Enter token use',
        tokenExpiration: +(process.env.TOKEN_EXPIRATION || 3600000),
        responseType: process.env.RESPONSE_TYPE || 'Enter response type',
    },
    redis: {
        port: +(process.env.REDIS_PORT || 6379),
        host: process.env.REDIS_HOST || 'localhost',
    },
};
