const mongoose = require('mongoose');

const gallerySetSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    // carousel: 6-7 images
    mainImages: [{ type: String }],
    // side panel 1 image + label
    side1Image: { type: String },
    side1Label: { type: String },
    // side panel 2 image + label
    side2Image: { type: String },
    side2Label: { type: String },
    displayOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', gallerySetSchema);
