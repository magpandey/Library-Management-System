import mongoose from "mongoose";

import { VALID_CUSTOMER_TYPES } from "../config/feeRules.js";
const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required for each customer"],
      trim: true,
    },
    contact: {
      type: String,
      default: null,
      trim: true,
    },
    customerType: {
      type: String,
      enum: VALID_CUSTOMER_TYPES,
      default: "regular",
    },
  },
  {
    timestamps: true
  },
);

export const Customer = mongoose.model('Customer',customerSchema)
