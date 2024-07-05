const mongoose = require('mongoose');

const TaxonomyNodeSchema = new mongoose.Schema({
  level: { type: Number, required: true },
  topic: { type: String, required: true },
  subTopic: { type: String, required: true },
  label: { type: String, required: true },
  answer: { type: String, default: "" },
});

module.exports = mongoose.model('TaxonomyNode', TaxonomyNodeSchema);
