const User = require('../models/User');

class UserRepository {
  async findByNickname(nickname) {
    return User.findOne({ nickname });
  }

  async createUser(nickname, passwordHash) {
    const user = new User({ nickname, passwordHash });
    return user.save();
  }

  async addGroup(userId, groupId) {
    return User.findByIdAndUpdate(userId, { $addToSet: { groups: groupId } }, { new: true });
  }

  async addInvitation(userId, groupId) {
    return User.findByIdAndUpdate(userId, { $addToSet: { invitations: groupId } }, { new: true });
  }

  async findById(userId) {
    return User.findById(userId);
  }

  async removeInvitation(userId, groupId) {
    return User.findByIdAndUpdate(userId, { $pull: { invitations: groupId } }, { new: true });
  }
}

module.exports = new UserRepository(); 