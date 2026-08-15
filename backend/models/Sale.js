const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },

    buyer: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    amountPaid: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
    },

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

    quantitySold: {
      type: Number,
      min: 1,
      required: true,
    },

    unit: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

saleSchema.virtual("amountOwed").get(function () {
  return Math.max(this.amount - this.amountPaid, 0);
});

saleSchema.virtual("isPaidInFull").get(function () {
  return this.amountPaid >= this.amount;
});

module.exports = mongoose.model("Sale", saleSchema);
