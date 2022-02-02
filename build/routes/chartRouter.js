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
const chartController = __importStar(require("../controllers/chartController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const chartRouter = express_1.default.Router();
chartRouter
    .route("/1")
    .get(authMiddleware_1.authMiddleware, chartController.diagram1);
chartRouter
    .route("/2")
    .get(authMiddleware_1.authMiddleware, chartController.diagram2);
chartRouter
    .route("/3")
    .get(authMiddleware_1.authMiddleware, chartController.diagram3);
chartRouter
    .route("/4")
    .get(authMiddleware_1.authMiddleware, chartController.diagram4);
exports.default = chartRouter;
//# sourceMappingURL=chartRouter.js.map