import mongoose from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

userSchema.statics.signup = async function(email, password) {
  if (!email || !password) {
    throw new Error('All fields are required');
  }

  if (!validator.isEmail(email)) {
    throw new Error('Invalid email');
  }
  
  const exists = await this.findOne({ email });
  
  if (exists) {
    throw new Error('This email is already registered');
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error('Weak Password')
  }


  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

  const user = await this.create({ email, password: hashedPassword });

  const hashedId = await hash(user._id.toString(), salt);

  return hashedId;
}

userSchema.statics.login = async function(email, password) {
  if (!email || !password) {
    throw new Error('All fields are required');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error('Email not registered');
  }

  const match = await compare(password, user.password);

  if (!match) {
    throw new Error('Invalid email or password');
  }

  if (!user.verified) {
    throw new Error('Email not verified');
  }

  return user;
}

userSchema.statics.verify = async function(email, token) {
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error('Email not registered');
  }

  if (user.verified) {
    throw new Error('Email already verified');
  }

  const match = await compare(user._id.toString(), token);

  if (!match) {
    throw new Error('Invalid token');
  }
  
  const newUser = await this.findOneAndUpdate(
    { email },
    { $set: { verified: true } },
    { new: true }
  )
  
  return newUser;
}

export default mongoose.model('User', userSchema);