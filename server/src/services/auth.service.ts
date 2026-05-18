import { User } from '../models/user.model';
import { generateToken } from '../utils/generateToken';
import { ApiError } from '../utils/ApiError';

export const registerUser = async (data: any) => {
  const { name, email, password, role } = data;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, 'User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  return {
    _id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user.id, user.role),
  };
};

export const loginUser = async (data: any) => {
  const { email, password } = data;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return {
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id, user.role),
    };
  } else {
    throw new ApiError(401, 'Invalid email or password');
  }
};
