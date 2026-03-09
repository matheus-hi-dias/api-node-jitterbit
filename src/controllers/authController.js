import * as authService from '../services/authService.js';
import { catchAsync } from '../utils/handler.js';

export const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const data = await authService.login(username, password);
  res.json(data);
});

export const register = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.register(username, password);
  res.status(201).json(user);
});
