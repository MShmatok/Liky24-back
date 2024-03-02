import { Schema, model } from "mongoose";
import { handlerSaveError } from "../models/hooks.js";
import Joi from "joi";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const ordersSchema = new Schema(
  {
    shopId: {
      type: String,
      required: [true, "Set shop for orders"],
    },
    name: {
      type: String,
      required: [true, "Set name for orders"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Set email for orders"],
    },
    phone: {
      type: Number,
      required: [true, "Set phone for orders"],
    },
    address: {
      type: String,
      required: [true, "Set address for orders"],
    },
    order: {
      type: Object,
      required: [true, "Set order for orders"],
    },
  },
  { versionKey: false, timestamps: true }
);

export const ModelOrders = model("order", ordersSchema);
ordersSchema.post("save", handlerSaveError);

// **************** Joi Schema ****************
export const ordersSchemaJoi = Joi.object({
  shopId: Joi.string().required().min(3).max(500).messages({
    "any.required": `missing required shopId field`,
  }),
  name: Joi.string().required().min(3).max(500).messages({
    "any.required": `missing required name field`,
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": `missing required email field`,
    }),
  phone: Joi.number().required().messages({
    "any.required": `missing required phone field`,
  }),
  address: Joi.string().required().min(3).max(100).messages({
    "any.required": `missing required shop field`,
  }),
  order: Joi.object().required().messages({
    "any.required": `missing required order field`,
  }),
});
