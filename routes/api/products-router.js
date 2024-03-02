import express from "express";
import { isEmptyBody } from "../../middlewares/index.js";
import { productsSchemaJoi } from "../../models/Model-products.js";
import { validateBodyReq } from "../../decorators/index.js";

import productsControllers from "../../controllers/products-controller.js";

const productsRouter = express.Router();
const ValidatorProducts = validateBodyReq(productsSchemaJoi);

productsRouter.get("/", productsControllers.getAll);
productsRouter.get("/:shopsId", productsControllers.getById);

productsRouter.post(
  "/",
  isEmptyBody,
  ValidatorProducts,
  productsControllers.addNew
);

export default productsRouter;
