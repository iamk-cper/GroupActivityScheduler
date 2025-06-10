const mongoose = require('mongoose');
const Group = require('../models/Group');

class GroupRepository {
  async createGroup(name, creatorId) {
    const group = new Group({ name, members: [creatorId], invitations: [], activities: [] });
    return group.save();
  }

  async addMember(groupId, userId) {
    return Group.findByIdAndUpdate(groupId, { $addToSet: { members: userId } }, { new: true });
  }

  async addInvitation(groupId, userId) {
    return Group.findByIdAndUpdate(groupId, { $addToSet: { invitations: userId } }, { new: true });
  }

  async addActivity(groupId, activityId) {
    return Group.findByIdAndUpdate(groupId, { $addToSet: { activities: activityId } }, { new: true });
  }

  async findById(groupId) {
    return Group.findById(groupId).populate('members invitations activities');
  }

  async getAllGroupsWithMembers() {
    return Group.find().populate('members', 'nickname').populate('activities');
  }

  async getGroupsByIds(ids) {
    return Group.find({ _id: { $in: ids } }).populate('members', 'nickname').populate('activities');
  }

  async removeInvitation(groupId, userId) {
    return Group.findByIdAndUpdate(groupId, { $pull: { invitations: userId } }, { new: true });
  }

  async getGroupsByMember(userId) {
    console.log('getGroupsByMember userId:', userId, typeof userId);
    const objectId = typeof userId === 'string' ? new mongoose.Types.ObjectId(userId) : userId;
    return Group.find({ members: objectId }).populate('members', 'nickname').populate('activities');
  }
}

module.exports = new GroupRepository(); 