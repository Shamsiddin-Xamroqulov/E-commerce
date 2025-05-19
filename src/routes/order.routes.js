import { Router } from "express"
import orderController from "../controllers/order.controller.js"

const orderRouter = Router();

orderRouter.get("/", orderController.orderGet);
orderRouter.post("/create",  orderController.orderCreate);
orderRouter.delete("/delete/:orderId", orderController.orderDelete);


export default orderRouter