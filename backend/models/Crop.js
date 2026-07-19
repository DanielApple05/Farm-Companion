const mongoose = require("mongoose");
 
const cropSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
 
    // Growth stage — updated manually for now, could later be inferred from plantedOn + crop type
    stage: {
      type: String,
      // enum: ["Seedling", "Vegetative", "Flowering", "Maturing", "Harvested"],
      default: "Seedling",
    },
 
    status: {
      type: String,
      enum: ["Healthy", "Flagged"],
      default: "Healthy",
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
 
    // Optional yield tracking, filled in after harvest
    yield: {
      amount: Number,
      unit: { type: String, enum: ["kg", "tons", "bags"], default: "kg" },
    },
  },
  { timestamps: true }
);
 
module.exports = mongoose.model("Crop", cropSchema);