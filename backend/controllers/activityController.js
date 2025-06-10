const ActivityRepository = require('../repositories/ActivityRepository');
const GroupRepository = require('../repositories/GroupRepository');
const ActivityDTO = require('../dtos/ActivityDTO');
const mongoose = require('mongoose');

exports.createActivity = async (req, res) => {
  const { description, duration, groupId } = req.body;
  const userId = req.userId;
  if (!description || !duration || !groupId) return res.status(400).json({ message: 'Missing fields' });
  const activity = await ActivityRepository.createActivity(description, duration, groupId, userId);
  await GroupRepository.addActivity(groupId, activity._id);
  const populatedActivity = await ActivityRepository.findById(activity._id);
  res.status(201).json(new ActivityDTO(populatedActivity));
};

exports.likeActivity = async (req, res) => {
  const { activityId } = req.body;
  const userId = req.userId;
  const activity = await ActivityRepository.likeActivity(activityId, userId);
  console.log('likeActivity result:', JSON.stringify(activity, null, 2));
  res.json(new ActivityDTO(activity));
};

exports.dislikeActivity = async (req, res) => {
  const { activityId } = req.body;
  const userId = req.userId;
  const activity = await ActivityRepository.dislikeActivity(activityId, userId);
  console.log('dislikeActivity result:', JSON.stringify(activity, null, 2));
  res.json(new ActivityDTO(activity));
};

exports.getActivitiesByGroup = async (req, res) => {
  const { groupId } = req.params;
  const activities = await ActivityRepository.getActivitiesByGroup(groupId);
  res.json(activities.map(a => new ActivityDTO(a)));
};

exports.deleteActivity = async (req, res) => {
  const userId = req.userId;
  const { activityId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(activityId)) {
    return res.status(400).json({ message: 'Invalid activity id' });
  }
  const activity = await ActivityRepository.findById(activityId);
  if (!activity) return res.status(404).json({ message: 'Activity not found' });
  if (activity.createdBy._id.toString() !== userId.toString()) {
    return res.status(403).json({ message: 'Only the creator can delete this activity' });
  }
  await ActivityRepository.deleteActivity(activityId);
  res.json({ message: 'Activity deleted' });
}; 