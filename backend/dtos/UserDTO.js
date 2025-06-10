class UserDTO {
  constructor(user) {
    this.id = user._id;
    this.nickname = user.nickname;
  }
}

module.exports = UserDTO; 