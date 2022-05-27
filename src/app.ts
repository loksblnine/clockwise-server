import {config} from './config';
import express from 'express';
import {logger} from './utils/logger';
import {sequelize} from "./database/config/config";
import router from "./routes/router";
import cors from 'cors';

const app: express.Express = express();

const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    passReqToCallback: true,
  },
  function (request: Request, accessToken: String, refreshToken: String, profile: any, done: any) {
    return done(null, profile);
  }));

passport.serializeUser(function (user: any, done: any) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
  done(null, user);
});

app.use(cors({origin: true}))
app.use(session({secret: process.env.SECRET_SESSION_WORD, resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json({limit: '7mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(express.static("static"))
app.use("/", router)

try {
  sequelize.authenticate();
  logger.info('Connection has been established successfully.');
} catch (error) {
  logger.error('Unable to connect to the database:', error);
}

app.listen(config.port, function () {
  logger.info(
    `server listening on port: ${config.port} and ${process.env.NODE_ENV}`
  );
});
export default app
