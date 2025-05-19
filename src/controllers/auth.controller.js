import { ClientError, globalError } from "shokhijakhon-error-handler";
import {userValidator, userLoginValidator} from "../utils/validator.js";
import { jwtConfig } from "../lib/jwt.js";
import { HashingService } from "../lib/hash.js";

class AuthController {
  constructor() {
    this.register = async (req, res) => {
      try {
        let user = req.body;
        let validate = userValidator.validate(user, { abortEarly: true });
        if (validate.error) throw new ClientError(validate.error.message, 400);
        let allUsers = await req.readFile("users");
        if (allUsers.some((item) => item.email == user.email))
          throw new ClientError("User already exists", 400);
        user = {
          id: allUsers.length ? allUsers.at(-1).id + 1 : 1,
          ...user,
          password: await HashingService.hashPassword(user.password),
          createdAt: new Date().toLocaleDateString(),
          updatedAt: null,
        };
        allUsers.push(user);
        await req.writeFile("users", allUsers);
        req.saveCookie(
          "token",
          jwtConfig.createToken({
            id: user.id,
            userAgent: req.headers["user-agent"],
          })
        );
        return res.redirect("/");
      } catch (err) {
        return globalError(err, res);
      }
    };
    this.login = async (req, res) => {
      try {
        let user = req.body;
        let validate = userLoginValidator.validate(user, { abortEarly: true });
        if (validate.error) throw new ClientError(validate.error.message, 400);
        let allUsers = await req.readFile("users");
        if (allUsers.find((item) => item.email == user.email))
          return res.redirect("/");
      } catch (err) {
        return globalError(err, res);
      }
    };
  }
}

export default new AuthController();
