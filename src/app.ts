import {config} from './config';
import express from 'express';
import {logger} from './utils/logger';
import {sequelize} from "./database/config/config";
import router from "./routes/router";
import cors from 'cors'

const app: express.Express = express();

app.use(cors())
app.use(express.json({ limit: '7mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
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
        `server listening on port: ${config.port}`
    );
});

