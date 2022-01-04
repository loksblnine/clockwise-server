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
const customerController = __importStar(require("../controllers/customerController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const customerRouter = express_1.default.Router();
customerRouter
    .route('/')
    .post(customerController.createCustomer);
customerRouter
    .route('/offset/:page')
    .get(authMiddleware_1.authMiddleware, customerController.getCustomers);
customerRouter
    .route('/:id')
    .get(authMiddleware_1.authMiddleware, customerController.getCustomerById)
    .put(authMiddleware_1.authCustomerMiddleware, customerController.updateCustomerById)
    .delete(authMiddleware_1.authMiddleware, customerController.deleteCustomerById);
customerRouter
    .route("/email/:email")
    .get(authMiddleware_1.authCustomerMiddleware, customerController.getCustomerByEmail);
exports.default = customerRouter;
//# sourceMappingURL=customerRouter.js.map