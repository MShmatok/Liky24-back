import { ModelProducts } from "../models/Model-products.js";
import { httpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const result = await ModelProducts.find({}, "-createdAt -updatedAt");
  if (!result) {
    throw httpError(404, `Products not found`);
  }
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { shopsId } = req.params;
  const result = await ModelProducts.find(
    { shopID: shopsId },
    "-createdAt -updatedAt"
  );
  if (!result) {
    throw httpError(404, `Products not found`);
  }
  res.status(200).json(result);
};

const addNew = async (req, res) => {
  const result = await ModelProducts.create(req.body);
  res.status(201).json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addNew: ctrlWrapper(addNew),
};
