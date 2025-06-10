const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nickname: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  invitations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }]
});

module.exports = mongoose.model('User', UserSchema); 