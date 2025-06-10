class ActivityDTO {
  constructor(activity) {
    this.id = activity._id;
    this.description = activity.description;
    this.duration = activity.duration;
    this.group = activity.group?._id || activity.group;
    this.createdBy = activity.createdBy?.nickname || activity.createdBy;
    this.likes = activity.likes ? activity.likes.length : 0;
    this.dislikes = activity.dislikes ? activity.dislikes.length : 0;
  }
}

module.exports = ActivityDTO; 