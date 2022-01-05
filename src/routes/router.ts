import express from "express";
import cityRouter from "./cityRouter";
import customerRouter from "./customerRouter";
import orderRouter from "./orderRouter";
import masterRouter from "./masterRouter";
import depsRouter from "./depsRouter";
import sendMailRouter from "./sendMailRouter";
import userRouter from "./userRouter";
import photoRouter from "./photoRouter";
import blogRouter from "./blogRouter";

const router: express.Router = express.Router();

router.use("/auth", userRouter);
router.use("/blog", blogRouter);
router.use("/cities", cityRouter);
router.use("/customers", customerRouter);
router.use("/deps", depsRouter);
router.use("/masters", masterRouter);
router.use("/orders", orderRouter);
router.use("/photo", photoRouter);
router.use("/send", sendMailRouter);

export default router;
