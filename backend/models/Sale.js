const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true, // e.g. "Maize", "Goats — 3 heads"
    },

    buyer: {
      type: String,
      required: true,
      trim: true, // just a name for now, not a full contact record
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

    // Optional, same reasoning as Expense — ties a sale back to a specific
    // planting or livestock group if the farmer wants that level of detail.
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
      default: null,
    },
  },
  {
    timestamps: true,
    // Adds amountOwed and isPaidInFull as computed, non-stored fields whenever
    // a Sale document is converted to JSON (e.g. sent in an API response) —
    // never written to the database, always derived fresh from amount/amountPaid.
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

saleSchema.virtual("amountOwed").get(function () {
  return this.amount - this.amountPaid;
});

saleSchema.virtual("isPaidInFull").get(function () {
  return this.amountPaid >= this.amount;
});

module.exports = mongoose.model("Sale", saleSchema);
