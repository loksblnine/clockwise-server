"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cityRouter_1 = __importDefault(require("./cityRouter"));
const customerRouter_1 = __importDefault(require("./customerRouter"));
const orderRouter_1 = __importDefault(require("./orderRouter"));
const masterRouter_1 = __importDefault(require("./masterRouter"));
const depsRouter_1 = __importDefault(require("./depsRouter"));
const sendMailRouter_1 = __importDefault(require("./sendMailRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const photoRouter_1 = __importDefault(require("./photoRouter"));
const router = express_1.default.Router();
router.use("/cities", cityRouter_1.default);
router.use("/customers", customerRouter_1.default);
router.use("/orders", orderRouter_1.default);
router.use("/masters", masterRouter_1.default);
router.use("/deps", depsRouter_1.default);
router.use("/send", sendMailRouter_1.default);
router.use("/auth", userRouter_1.default);
router.use("/photo", photoRouter_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map