const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLenght: 200,
    },
    type: {
      type: String,
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
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("offer", OfferSchema);
