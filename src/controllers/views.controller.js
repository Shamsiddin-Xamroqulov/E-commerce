import {globalError} from "shokhijakhon-error-handler"

class ViewsController {
    constructor() {
        this.main = async (req, res) => {
            try {
                let products = await req.readFile("products")
                return res.render("index", {products});
            } catch(err) {
                return globalError(err, res)
            }
        }
        this.register = async (req, res) => {
            try {
                return res.render("register")
            } catch(err) {
                return globalError(err, res)
            }
        }
        this.login = async (req, res) => {
            try {
                return res.render("login")
            } catch(err) {
                return globalError(err, res);
            }        
        }
    }
}

export default new ViewsController();