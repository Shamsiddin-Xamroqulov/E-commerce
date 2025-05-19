import jwt from "jsonwebtoken"
import {serverConfig} from "../config.js"
const {secretKey} = serverConfig

export const jwtConfig = {
    createToken: (payload) => jwt.sign(payload, secretKey),
    verifyToken: (payload) => jwt.verify(payload, secretKey)
}
