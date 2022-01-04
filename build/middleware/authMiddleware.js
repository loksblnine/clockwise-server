"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMasterMiddleware = exports.authCustomerMiddleware = exports.authRefreshMiddleware = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (request, response, next) => {
    try {
        const token = String(request?.headers?.authorization?.split(' ')[1]);
        if (!token) {
            response.status(401).json({ message: "Не авторизован" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, String(process.env.SECRET_KEY));
        if (decoded?.role === 1) {
            request.body.user = decoded;
            next();
        }
        else {
            response.status(401).json({ message: "Не авторизован" });
        }
    }
    catch (e) {
        response.status(401).json({ message: "Не авторизован" });
    }
};
exports.authMiddleware = authMiddleware;
const authRefreshMiddleware = (request, response, next) => {
    try {
        const token = String(request?.headers?.authorization?.split(' ')[1]);
        if (!token) {
            response.status(401).json({ message: "Не авторизован" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, String(process.env.SECRET_KEY));
        if (decoded?.role === 1 || decoded?.role === 2 || decoded?.role === 3) {
            request.body.user = decoded;
            next();
        }
        else {
            response.status(401).json({ message: "Не авторизован" });
        }
    }
    catch (e) {
        response.status(401).json({ message: "Не авторизован" });
    }
};
exports.authRefreshMiddleware = authRefreshMiddleware;
const authCustomerMiddleware = (request, response, next) => {
    try {
        const token = String(request?.headers?.authorization?.split(' ')[1]);
        if (!token) {
            response.status(401).json({ message: "Не авторизован" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, String(process.env.SECRET_KEY));
        if (decoded?.role === 3 || decoded?.role === 1) {
            request.body.user = decoded;
            next();
        }
        else {
            response.status(401).json({ message: "Не авторизован" });
        }
    }
    catch (e) {
        response.status(401).json({ message: "Не авторизован" });
    }
};
exports.authCustomerMiddleware = authCustomerMiddleware;
const authMasterMiddleware = (request, response, next) => {
    try {
        const token = String(request?.headers?.authorization?.split(' ')[1]);
        if (!token) {
            response.status(401).json({ message: "Не авторизован" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, String(process.env.SECRET_KEY));
        if (decoded?.role === 2 || decoded?.role === 1) {
            request.body.user = decoded;
            next();
        }
        else {
            response.status(401).json({ message: "Не авторизован" });
        }
    }
    catch (e) {
        response.status(401).json({ message: "Не авторизован" });
    }
};
exports.authMasterMiddleware = authMasterMiddleware;
//# sourceMappingURL=authMiddleware.js.map