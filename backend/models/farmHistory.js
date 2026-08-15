const mongoose = require("mongoose");

const farmHistorySchema = new mongoose.Schema(
  {
    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "crop_planted",
        "crop_harvested",
        "crop_diagnosed",

        "livestock_added",
        "livestock_removed",

        "equipment_added",
        "equipment_updated",
        "equipment_removed",

        "sale_recorded",
        "expense_recorded",
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    crop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Crop",
    },

    livestock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Livestock",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("FarmHistory", farmHistorySchema);