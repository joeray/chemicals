const mongoose = require('mongoose');

const chemicalsSchema = new mongoose.Schema({
  'patent no': String,
  'patent title': String,
  group: Number,
  type: String,
});

module.exports = mongoose.model('Chemicals', chemicalsSchema);
