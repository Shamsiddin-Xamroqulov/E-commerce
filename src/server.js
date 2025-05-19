import express from "express";
import path from "path"
import {config} from "dotenv"
import {engine} from "express-handlebars"
import cookieParser from "cookie-parser"
import {serverConfig} from "./config.js"
const {PORT} = serverConfig
import viewsRouter from "./routes/views.routes.js"
import model from "./model/model.js"
import mainRouter from "./routes/main.routes.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(process.cwd(), "public")))
app.set("view engine", ".hbs");
app.set("views", path.join(process.cwd(), "src", "views"));
app.engine(".hbs", engine({
    extname: ".hbs"
}));

app.use(cookieParser())

app.use(model)

app.use(viewsRouter)

app.use("/api", mainRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}:port`)
});