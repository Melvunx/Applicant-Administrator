const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      maxLenght: 200,
    },
    company: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    applyDate: {
      type: Date,
      require: true,
    },
    status: {
      type: String,
      default: "Pas encore envoyé",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("offer", OfferSchema);
