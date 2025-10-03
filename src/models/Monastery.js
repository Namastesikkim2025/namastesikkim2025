const mongoose = require('mongoose');

const MonasterySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    district: { type: String, trim: true },
    establishedYear: { type: Number },
    description: { type: String },
    images: [{ type: String }],
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    },
    tags: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Monastery', MonasterySchema);


