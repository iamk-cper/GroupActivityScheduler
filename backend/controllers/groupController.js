const GroupRepository = require('../repositories/GroupRepository');
const UserRepository = require('../repositories/UserRepository');
const GroupDTO = require('../dtos/GroupDTO');

exports.createGroup = async (req, res) => {
  const { name } = req.body;
  const userId = req.userId;
  if (!name) return res.status(400).json({ message: 'Group name required' });
  const group = await GroupRepository.createGroup(name, userId);
  await UserRepository.addGroup(userId, group._id);
  res.status(201).json(new GroupDTO(group));
};

exports.inviteUser = async (req, res) => {
  const { groupId, nickname } = req.body;
  const user = await UserRepository.findByNickname(nickname);
  if (!user) return res.status(404).json({ message: 'User not found' });
  await GroupRepository.addInvitation(groupId, user._id);
  await UserRepository.addInvitation(user._id, groupId);
  res.json({ message: 'Invitation sent' });
};

exports.getAllGroups = async (req, res) => {
  const groups = await GroupRepository.getAllGroupsWithMembers();
  res.json(groups.map(g => new GroupDTO(g)));
};

exports.getInvitations = async (req, res) => {
  const userId = req.userId;
  const user = await UserRepository.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const groups = await GroupRepository.getGroupsByIds(user.invitations);
  res.json(groups.map(g => new GroupDTO(g)));
};

exports.acceptInvitation = async (req, res) => {
  const userId = req.userId;
  const { groupId } = req.body;
  const user = await UserRepository.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  await UserRepository.removeInvitation(userId, groupId);
  await UserRepository.addGroup(userId, groupId);
  await GroupRepository.addMember(groupId, userId);
  res.json({ message: 'Invitation accepted' });
};

exports.rejectInvitation = async (req, res) => {
  const userId = req.userId;
  const { groupId } = req.body;
  await UserRepository.removeInvitation(userId, groupId);
  await GroupRepository.removeInvitation(groupId, userId);
  res.json({ message: 'Invitation rejected' });
};

exports.getMyGroups = async (req, res) => {
  const userId = req.userId;
  const groups = await GroupRepository.getGroupsByMember(userId);
  res.json(groups.map(g => new GroupDTO(g)));
}; 