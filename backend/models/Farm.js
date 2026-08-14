const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Auto-filled from the user's account location at creation time, editable in the form
    location: {
      type: String,
      required: true,
      trim: true,
    },

    // Matches the toggle in AddFarmModal — drives which detail view (crop vs livestock) the farm defaults to
    type: {
      type: String,
      enum: ["crop", "livestock", "mixed"],
      default: "mixed",
    },

    size: {
      value: { type: Number },
      unit: { type: String, enum: ["hectares", "acres"], default: "hectares" },
    },

    photoUrl: {
      type: String,
      default: "",
    },

    // Owner reference — every farm belongs to exactly one user
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Relations — populated as crops/livestock get added to this farm
    crops: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Crop",
      },
    ],
    livestock: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Livestock",
      },
    ],
    equipment: [
      {
        name: String,
        quantity: Number,
        condition: {
          type: String,
          enum: ["Good", "Needs repair", "Broken"],
          default: "Good",
        },
      },
    ],
    history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FarmHistory",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Farm", farmSchema);
