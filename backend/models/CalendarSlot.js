const mongoose = require('mongoose');

const CalendarSlotSchema = new mongoose.Schema({
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  date: { type: String, required: true }, // e.g., '2024-06-01'
  description: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('CalendarSlot', CalendarSlotSchema); 