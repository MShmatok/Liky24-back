import { ModelShops } from "../models/Model-shops.js";
import { httpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const result = await ModelShops.find({}, "-createdAt -updatedAt ");
  if (!result) {
    throw httpError(404, `Shops not found`);
  }
  res.status(200).json(result);
};

const addNew = async (req, res) => {
  const result = await ModelShops.create(req.body);
  res.status(201).json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  addNew: ctrlWrapper(addNew),
};
