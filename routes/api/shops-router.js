import express from "express";
import { isEmptyBody } from "../../middlewares/index.js";
import { shopSchemaJoi } from "../../models/Model-shops.js";
import { validateBodyReq } from "../../decorators/index.js";

import shopsControllers from "../../controllers/shops-controller.js";

const contactsRouter = express.Router();
const ValidatorShops = validateBodyReq(shopSchemaJoi);

contactsRouter.get("/", shopsControllers.getAll);

contactsRouter.post("/", isEmptyBody, ValidatorShops, shopsControllers.addNew);

export default contactsRouter;
