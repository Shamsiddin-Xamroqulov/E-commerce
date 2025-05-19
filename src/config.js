import path from "path"
import {config} from "dotenv"
config()

export const serverConfig = {
    globalPrefix: "api",
    PORT: process.env.PORT || 5000,
    dbPath: (fileName) => path.join(process.cwd(), "db", fileName) ,
    secretKey: process.env.TOKEN_KEY
}