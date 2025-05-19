import {Router} from "express";
import viewsController from "../controllers/views.controller.js"

const viewsRouter = Router();

viewsRouter.get("/", viewsController.main)
viewsRouter.get("/login", viewsController.login)
viewsRouter.get("/register", viewsController.register)

export default viewsRouter