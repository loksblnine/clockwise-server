"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedInGoogle = exports.authMasterMiddleware = exports.authCustomerMasterMiddleware = exports.authCustomerMiddleware = exports.authRefreshMiddleware = exports.authMiddleware = void 0;
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
const authCustomerMasterMiddleware = (request, response, next) => {
    try {
        const token = String(request?.headers?.authorization?.split(' ')[1]) === "" ? String(request?.headers?.authorization?.split(' ')[1]) : String(request?.query?.token);
        if (!token) {
            response.status(401).json({ message: "Не авторизован" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, String(process.env.SECRET_KEY));
        if (decoded?.role === 3 || decoded?.role === 2 || decoded?.role === 1) {
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
exports.authCustomerMasterMiddleware = authCustomerMasterMiddleware;
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
const isLoggedInGoogle = (request, response, next) => {
    if (request.user) {
        request.user.email ? next() : response.sendStatus(401);
    }
    else {
        response.status(401);
    }
};
exports.isLoggedInGoogle = isLoggedInGoogle;
//# sourceMappingURL=authMiddleware.js.map