export default class CalendarSlotDTO {
  constructor({ id, group, date, hour, activity, availableUsers, joinedUsers }) {
    this.id = id;
    this.group = group;
    this.date = date;
    this.hour = hour;
    this.activity = activity;
    this.availableUsers = availableUsers;
    this.joinedUsers = joinedUsers;
  }
} 