import { Schema, model } from "mongoose";
import { handlerSaveError } from "../models/hooks.js";
import Joi from "joi";

const shopSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for shop"],
    },
    address: {
      type: String,
      required: [true, "Set address for shop"],
    },
  },
  { versionKey: false, timestamps: true }
);

export const ModelShops = model("shop", shopSchema);
shopSchema.post("save", handlerSaveError);

// **************** Joi Schema ****************
export const shopSchemaJoi = Joi.object({
  name: Joi.string().required().min(3).max(50).messages({
    "any.required": `missing required name field`,
  }),
  address: Joi.string().required().min(3).max(100).messages({
    "any.required": `missing required address field`,
  }),
});
