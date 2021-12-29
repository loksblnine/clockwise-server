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

router.use("/cities", cityRouter);
router.use("/customers", customerRouter);
router.use("/orders", orderRouter);
router.use("/masters", masterRouter);
router.use("/deps", depsRouter);
router.use("/send", sendMailRouter);
router.use("/auth", userRouter);
router.use("/photo", photoRouter);
router.use("/blog", blogRouter);

export default router;
