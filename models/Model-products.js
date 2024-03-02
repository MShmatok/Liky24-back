import { Schema, model } from "mongoose";
import { handlerSaveError } from "../models/hooks.js";
import Joi from "joi";

const productsSchema = new Schema(
  {
    shopID: {
      type: String,
      required: [true, "Set shop for products"],
    },
    title: {
      type: String,
      required: [true, "Set description for products"],
    },
    price: {
      type: Number,
      required: [true, "Set price for products"],
    },
    linkPhoto: {
      type: String,
      required: [true, "Set linkPhoto for products"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

export const ModelProducts = model("product", productsSchema);
productsSchema.post("save", handlerSaveError);

// **************** Joi Schema ****************
export const productsSchemaJoi = Joi.object({
  shopID: Joi.string().required().min(3).max(500).messages({
    "any.required": `missing required shop field`,
  }),
  title: Joi.string().required().min(3).max(500).messages({
    "any.required": `missing required title field`,
  }),
  price: Joi.number().required().messages({
    "any.required": `missing required title field`,
  }),
  linkPhoto: Joi.string().required().min(3).max(500).messages({
    "any.required": `missing required title field`,
  }),
});
