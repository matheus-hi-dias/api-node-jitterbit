import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/userRepository.js';

const SECRET = process.env.JWT_SECRET;

export const login = async (username, password) => {
  const user = await userRepository.findByUsername(username);

  if (!user) throw new Error('Invalid Credentials');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid Credentials');

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
    expiresIn: '1h',
  });

  return { token };
};

export const register = async (username, password) => {
  const existingUser = await userRepository.findByUsername(username);
  if (existingUser) throw new Error('User already exists');
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return await userRepository.create(username, hashedPassword);
};
