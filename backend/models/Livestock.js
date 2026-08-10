const mongoose = require("mongoose");

const livestockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      // enum: ["Poultry", "Goats", "Cattle", "Sheep"],
      required: true,
    },

    stage: {
      type: String,
      required: true,
    },

    breed: {
      type: String,
      trim: true,
      default: "",
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

    vaccinations: [
      {
        name: {
          type: String,
          required: true,
        },

        dueDate: Date,

        completedOn: Date,
      },
    ],

    healthLogs: [
      {
        note: {
          type: String,
          trim: true,
        },

        aiResponse: {
          type: String,
          default: "",
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Livestock", livestockSchema);