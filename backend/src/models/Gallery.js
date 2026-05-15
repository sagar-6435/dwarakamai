const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    category: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);
