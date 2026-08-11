const mongoose = require("mongoose");
const { calculateCropStage } = require("../utils/cropMaturity");

const cropSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
    },

    plantedOn: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Healthy", "Flagged"],
      default: "Healthy",
    },
    
    yield: {
      amount: {
        type: Number,
        min: 0,
      },
      unit: {
        type: String,
        enum: ["kg", "tons", "bags"],
        default: "kg",
      },
    },

    harvestedOn: {
      type: Date,
      default: null,
    },

    photoUrl: {
      type: String,
      default: "",
    },

    // History of diagnosis results from the Diagnose Crop flow (Pl@ntNet + Claude explanation)
    diagnosisLogs: [
      {
        disease: String,
        confidence: Number,
        explanation: String,
        imageUrl: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// stage is calculated live from plantedOn + crop name — never stored,
// never goes stale, no manual updating needed.
cropSchema.virtual("stage").get(function () {
  return calculateCropStage(this.name, this.plantedOn).stage;
});

cropSchema.virtual("percentComplete").get(function () {
  return calculateCropStage(this.name, this.plantedOn).percentComplete;
});

cropSchema.virtual("isOverdue").get(function () {
  return calculateCropStage(this.name, this.plantedOn).isOverdue;
});

module.exports = mongoose.model("Crop", cropSchema);
