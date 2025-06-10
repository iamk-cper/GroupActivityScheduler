export default class ActivityDTO {
  constructor({ id, description, duration, group, createdBy, likes, dislikes }) {
    this.id = id;
    this.description = description;
    this.duration = duration;
    this.group = group;
    this.createdBy = createdBy;
    this.likes = likes;
    this.dislikes = dislikes;
  }
} 