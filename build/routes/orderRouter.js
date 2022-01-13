"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController = __importStar(require("../controllers/orderController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const orderRouter = express_1.default.Router();
orderRouter
    .route('/')
    .post(orderController.createOrder);
orderRouter
    .route('/offset/:page')
    .get(authMiddleware_1.authMiddleware, orderController.getOrders);
orderRouter
    .route('/master/:id/offset/:page')
    .get(authMiddleware_1.authMasterMiddleware, orderController.getMasterOrders);
orderRouter
    .route('/customer/:id/offset/:page')
    .get(authMiddleware_1.authCustomerMiddleware, orderController.getCustomerOrders);
orderRouter
    .route('/:id')
    .get(authMiddleware_1.authMiddleware, orderController.getOrderById)
    .put(authMiddleware_1.authMiddleware, orderController.updateOrder)
    .delete(authMiddleware_1.authMiddleware, orderController.deleteOrder);
exports.default = orderRouter;
//# sourceMappingURL=orderRouter.js.map