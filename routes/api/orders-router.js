import express from "express";
import { isEmptyBody } from "../../middlewares/index.js";
import { ordersSchemaJoi } from "../../models/Model-orders.js";
import { validateBodyReq } from "../../decorators/index.js";

import ordersControllers from "../../controllers/orders-controller.js";

const ordersRouter = express.Router();
const ValidatorOrders = validateBodyReq(ordersSchemaJoi);

ordersRouter.get("/", ordersControllers.getAll);
ordersRouter.get("/:orderId", ordersControllers.getById);
ordersRouter.get("/:phone/phone", ordersControllers.getByPhone);

ordersRouter.post("/", isEmptyBody, ValidatorOrders, ordersControllers.addNew);

export default ordersRouter;
