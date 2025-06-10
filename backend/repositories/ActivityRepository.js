const Activity = require('../models/Activity');

class ActivityRepository {
  async createActivity(description, duration, groupId, createdBy) {
    const activity = new Activity({ description, duration, group: groupId, createdBy });
    return activity.save();
  }

  async likeActivity(activityId, userId) {
    return Activity.findByIdAndUpdate(
      activityId,
      { $addToSet: { likes: userId }, $pull: { dislikes: userId } },
      { new: true }
    ).populate('group createdBy likes dislikes');
  }

  async dislikeActivity(activityId, userId) {
    return Activity.findByIdAndUpdate(
      activityId,
      { $addToSet: { dislikes: userId }, $pull: { likes: userId } },
      { new: true }
    ).populate('group createdBy likes dislikes');
  }

  async findById(activityId) {
    return Activity.findById(activityId).populate('group createdBy likes dislikes');
  }

  async getActivitiesByGroup(groupId) {
    return Activity.find({ group: groupId }).populate('group createdBy likes dislikes');
  }

  async deleteActivity(activityId) {
    return Activity.findByIdAndDelete(activityId);
  }
}

module.exports = new ActivityRepository(); 