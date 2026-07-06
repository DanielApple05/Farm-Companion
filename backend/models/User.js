const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // Captured after first login (geolocation), reused when pre-filling Add Farm
    location: {
      type: String,
      default: "",
    },

    // Drives onboarding + which quick actions/nav items are emphasized
    farmFocus: {
      type: String,
      enum: ["crop", "livestock", "both"],
      default: "both",
    },

    // Relations — populated as the user adds data
    farms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farm",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);