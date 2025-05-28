// models/View.js
const mongoose = require('mongoose');

const viewSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  count: { type: Number, default: 1 }
});

module.exports = mongoose.model('View', viewSchema);
