import fs from "fs/promises";
import {serverConfig} from "../config.js";
const model = (req, res, next) => {
    req.readFile = async (filename) => {
        let data = await fs.readFile(serverConfig.dbPath(filename + ".json"))
        return data ? JSON.parse(data): []
    };
    req.writeFile = async function(filename, data){
        await fs.writeFile(serverConfig.dbPath(filename + ".json"), JSON.stringify(data, null, 4));
        return true
    };
    req.saveCookie = function(key, data){
        res.cookie(key, data, {http: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "strict", secure: process.env.NODE_ENV == "production"});
        return true
    }
    return next();
}
export default model