const UserRepository = require('../repositories/UserRepository');
const UserDTO = require('../dtos/UserDTO');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

exports.register = async (req, res) => {
  const { nickname, password } = req.body;
  if (!nickname || !password) return res.status(400).json({ message: 'Nickname and password required' });
  const existing = await UserRepository.findByNickname(nickname);
  if (existing) return res.status(409).json({ message: 'Nickname already taken' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await UserRepository.createUser(nickname, passwordHash);
  res.status(201).json(new UserDTO(user));
};

exports.login = async (req, res) => {
  const { nickname, password } = req.body;
  const user = await UserRepository.findByNickname(nickname);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: new UserDTO(user) });
}; 