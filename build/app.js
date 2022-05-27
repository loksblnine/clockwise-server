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
const config_1 = require("./config");
const express_1 = __importDefault(require("express"));
const logger_1 = require("./utils/logger");
const config_2 = require("./database/config/config");
const router_1 = __importDefault(require("./routes/router"));
const cors_1 = __importDefault(require("cors"));
const socketio = __importStar(require("socket.io"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const httpServer = require("http").createServer(app);
const io = new socketio.Server(httpServer);
passport.use(new GoogleStrategy({
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    passReqToCallback: true,
}, function (request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
app.use((0, cors_1.default)({ origin: true }));
app.use(session({ secret: process.env.SECRET_SESSION_WORD, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express_1.default.json({ limit: '7mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use(express_1.default.static("static"));
app.use("/", router_1.default);
try {
    config_2.sequelize.authenticate();
    logger_1.logger.info('Connection has been established successfully.');
}
catch (error) {
    logger_1.logger.error('Unable to connect to the database:', error);
}
io.use((socket, next) => {
    if (socket?.handshake?.query?.token) {
        jsonwebtoken_1.default.verify(String(socket.handshake.query.token), String(process.env.SECRET_KEY), function (err, decoded) {
            if (err)
                return next(new Error('Token expired'));
            socket.decoded = decoded;
            return next();
        });
    }
    else {
        next(new Error('Something went wrong'));
    }
})
    .on('connection', function (socket) {
    socket.on('message', function (message) {
        io.emit('message', message);
    });
});
httpServer.listen(config_1.config.port, function () {
    logger_1.logger.info(`server listening on port: ${config_1.config.port} and ${process.env.NODE_ENV}`);
});
exports.default = httpServer;
//# sourceMappingURL=app.js.map