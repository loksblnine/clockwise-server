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
const depsController = __importStar(require("../controllers/depsController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const depsRouter = express_1.default.Router();
depsRouter
    .route('/')
    .get(authMiddleware_1.authMiddleware, depsController.getAllDeps)
    .delete(authMiddleware_1.authMasterMiddleware, depsController.deleteDependency)
    .post(authMiddleware_1.authMasterMiddleware, depsController.createDependency);
depsRouter
    .route('/city/:id')
    .get(authMiddleware_1.authMiddleware, depsController.getCityMasters);
depsRouter
    .route('/master/:id')
    .get(authMiddleware_1.authMasterMiddleware, depsController.getMasterCities);
exports.default = depsRouter;
//# sourceMappingURL=depsRouter.js.map