const mongoose = require("mongoose");
 
const livestockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Poultry", "Goats", "Cattle", "Sheep"],
      required: true,
    },
 
    breed: {
      type: String,
      trim: true,
    },
 
    headcount: {
      type: Number,
      required: true,
      min: 1,
    },
 
    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
    },
 
    status: {
      type: String,
      enum: ["Healthy", "Due for vaccination", "Flagged"],
      default: "Healthy",
    },
 
    photoUrl: {
      type: String,
      default: "",
    },
 
    // Scheduled care — vaccinations, deworming, etc.
    vaccinations: [
      {
        name: String, // e.g. "PPR vaccination"
        dueDate: Date,
        completedOn: Date,
      },
    ],
 
    // Symptom/health entries logged from the "Log symptom" flow, with optional AI follow-up
    healthLogs: [
      {
        note: String, // e.g. "Coughing, reduced appetite"
        aiResponse: String, // Claude's reasoning on possible causes, if requested
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);
 
module.exports = mongoose.model("Livestock", livestockSchema);