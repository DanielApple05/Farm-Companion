const mongoose = require("mongoose");

const livestockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
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

    quantitySold: {
      type: Number,
      min: 0,
      default: 0,
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

livestockSchema.virtual("availableHeads").get(function () {
  return Math.max(0, this.headcount - this.quantitySold || 0 );
});

module.exports = mongoose.model("Livestock", livestockSchema);
