import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import sendMail from './transporter.js';

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.USER_SECRET, { expiresIn: '3d' });
}

export const userSignup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedId = await User.signup(email, password);

    sendMail(email, hashedId);

    res.status(200).json({ email, hashedId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password)
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const userVerify = async (req, res) => {
  const { email, token } = req.query;

  try {
    const user = await User.verify(email, token);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}