const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  routeName: {
    type: String,
    required: true,
  },
  origin: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  destination: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  currentLocation: {
    latitude: { type: Number },
    longitude: { type: Number },
    timestamp: { type: Date, default: Date.now },
  },
  comments: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Location', locationSchema);
