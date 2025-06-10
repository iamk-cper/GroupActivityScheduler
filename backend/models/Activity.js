const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  description: { type: String, required: true },
  duration: { type: Number, required: true }, // duration in minutes
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Activity', ActivitySchema); 