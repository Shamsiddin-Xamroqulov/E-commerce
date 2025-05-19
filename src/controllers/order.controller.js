import { ClientError, globalError } from "shokhijakhon-error-handler";
import { orderIdValidator } from "../utils/validator.js";

class OrderController {
  constructor() {
    this.orderCreate = async (req, res) => {
      try {
        const { orderId } = req.body;
        console.log(orderId)
        let orderValidator = orderIdValidator.validate(req.body, {
          abortEarly: true,
        });
        if (orderValidator.error)
          throw new ClientError(orderValidator.error.message, 400);
        let readOrderDb = await req.readFile("orders");
        if (readOrderDb.some((item) => item.id == Number(orderId)))
          throw new ClientError("Order already exists", 400);

        let readProductDb = await req.readFile("products");

        let product = readProductDb.find(
          (product) => product.id == Number(orderId)
        );

        if (!product) throw new ClientError("Product not found", 404);

        let newOrder = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        };

        readOrderDb.push(newOrder);
        await req.writeFile("orders", readOrderDb);

        res
          .status(201)
          .json({ message: "Order successfully created!", status: 201 });
      } catch (err) {
        return globalError(err, res);
      }
    };
    this.orderGet = async (req, res) => {
      try {
        let readOrderDb = await req.readFile("orders");
        console.log(readOrderDb);
        return res.status(200).json({
          message: "Order successfuly fetchted",
          status: 200,
          res: readOrderDb,
        });
      } catch (err) {
        return globalError(err, res);
      }
    };
    this.orderDelete = async (req, res) => {
      try {
        const orderId = req.params.orderId
        let readOrderDb = await req.readFile("orders");

        const orderIndex = readOrderDb.findIndex(
          (order) => order.id === Number(orderId)
        );

        if (orderIndex === -1) throw new ClientError("Order not found!", 404);

        readOrderDb.splice(orderIndex, 1);

        await req.writeFile("orders", readOrderDb);

        res.status(200).json({
          message: "Order successfully deleted!",
          status: 200,
        });
      } catch (err) {
        return globalError(err, res);
      }
    };
  }
}

export default new OrderController();
