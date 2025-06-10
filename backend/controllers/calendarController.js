const CalendarSlotRepository = require('../repositories/CalendarSlotRepository');
const CalendarSlotDTO = require('../dtos/CalendarSlotDTO');
const UserRepository = require('../repositories/UserRepository');

exports.createSlot = async (req, res) => {
  const { groupId, date, description } = req.body;
  if (!groupId || !date || !description) return res.status(400).json({ message: 'Missing fields' });
  const slot = await CalendarSlotRepository.createSlot(groupId, date, description);
  // Populate members' nicknames for consistency
  await slot.populate('members', 'nickname');
  res.status(201).json(slot);
};

exports.getSlotsByGroup = async (req, res) => {
  const { groupId } = req.params;
  const slots = await CalendarSlotRepository.getSlotsByGroup(groupId);
  res.json(slots);
};

exports.joinSlot = async (req, res) => {
  const { slotId } = req.body;
  const userId = req.userId;
  if (!slotId) return res.status(400).json({ message: 'Missing slotId' });
  const slot = await CalendarSlotRepository.addMember(slotId, userId);
  res.json(slot);
};

exports.leaveSlot = async (req, res) => {
  const { slotId } = req.body;
  const userId = req.userId;
  if (!slotId) return res.status(400).json({ message: 'Missing slotId' });
  const slot = await CalendarSlotRepository.removeMember(slotId, userId);
  res.json(slot);
}; 