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
const userController = __importStar(require("../controllers/userController"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
const passport = require('passport');
router
    .route('/register')
    .post(userController.registerUser);
router
    .route("/login")
    .post(userController.loginUser)
    .get(authMiddleware_1.authRefreshMiddleware, userController.isTokenValid);
router
    .route("/approve-master/:id")
    .put(authMiddleware_1.authMiddleware, userController.approveMaster);
router
    .route("/approve-user")
    .get(userController.approveUser);
router
    .route("/approve-order/:id")
    .put(authMiddleware_1.authMasterMiddleware, userController.approveOrder);
router
    .route("/set-mark/:id")
    .put(authMiddleware_1.authCustomerMiddleware, userController.setMarkOrder);
router
    .route("/google")
    .get(passport.authenticate('google', { scope: ['email', 'profile'] }));
router
    .route("/google/callback")
    .get(passport.authenticate('google', {
    successRedirect: 'auth/google/protected',
    failureRedirect: '/failure'
}));
router
    .route("/failure")
    .get((req, res) => {
    res.send('Failed to authenticate..');
});
router
    .route('/google/auth/google/protected')
    .get(authMiddleware_1.isLoggedInGoogle, userController_1.isTokenValidGoogle);
router
    .route('/google/logout')
    .get((req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye!');
});
exports.default = router;
//# sourceMappingURL=userRouter.js.map