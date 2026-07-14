const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    category: {
      type: String,
      enum: ["Seeds", "Fertilizer", "Labor", "Equipment", "Veterinary", "Other"],
      default: "Other",
    },

    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
    },

    // Optional — lets a farmer tie a cost to a specific planting or livestock
    // group when they want to know what THAT one actually cost to run.
    // Most expenses will likely leave these unset (general farm overhead).
    crop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Crop",
      default: null,
    },
    livestock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Livestock",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);