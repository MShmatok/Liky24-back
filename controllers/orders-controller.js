import { ModelOrders } from "../models/Model-orders.js";
import { httpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const result = await ModelOrders.find({}, "-createdAt -updatedAt");
  if (!result) {
    throw httpError(404, `Products not found`);
  }
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { orderId } = req.params;
  const result = await ModelOrders.find(
    { _id: orderId },
    "-createdAt -updatedAt"
  );
  if (!result) {
    throw httpError(404, `Products not found by orderId`);
  }
  res.status(200).json(result);
};

const getByPhone = async (req, res) => {
  const { phone } = req.params;
  const result = await ModelOrders.find(
    { phone: phone },
    "-createdAt -updatedAt"
  );
  if (!result) {
    throw httpError(404, `Products not found by phone`);
  }
  res.status(200).json(result);
};

const addNew = async (req, res) => {
  const result = await ModelOrders.create(req.body);
  res.status(201).json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addNew: ctrlWrapper(addNew),
  getByPhone: ctrlWrapper(getByPhone),
};
