class GroupDTO {
  constructor(group) {
    this.id = group._id;
    this.name = group.name;
    this.members = group.members ? group.members.map(m => m.nickname || m) : [];
    this.activities = group.activities ? group.activities.map(a => a._id || a) : [];
  }
}

module.exports = GroupDTO; 