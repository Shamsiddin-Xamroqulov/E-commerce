import {Router} from "express"
import authRouter from "./auth.routes.js"
import orderRouter from "./order.routes.js";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/order", orderRouter);

export default mainRouter