const CalendarSlot = require('../models/CalendarSlot');

class CalendarSlotRepository {
  async createSlot(groupId, date, description) {
    const slot = new CalendarSlot({ group: groupId, date, description, members: [] });
    return slot.save();
  }

  async getSlotsByGroup(groupId) {
    return CalendarSlot.find({ group: groupId }).populate('members', 'nickname');
  }

  async findByGroupAndDate(groupId, date) {
    return CalendarSlot.find({ group: groupId, date }).populate('activity availableUsers joinedUsers');
  }

  async findById(slotId) {
    return CalendarSlot.findById(slotId)
      .populate('activity', 'description')
      .populate('availableUsers', 'nickname')
      .populate('joinedUsers', 'nickname');
  }

  async addMember(slotId, userId) {
    return CalendarSlot.findByIdAndUpdate(
      slotId,
      { $addToSet: { members: userId } },
      { new: true }
    ).populate('members', 'nickname');
  }

  async removeMember(slotId, userId) {
    return CalendarSlot.findByIdAndUpdate(
      slotId,
      { $pull: { members: userId } },
      { new: true }
    ).populate('members', 'nickname');
  }
}

module.exports = new CalendarSlotRepository(); 