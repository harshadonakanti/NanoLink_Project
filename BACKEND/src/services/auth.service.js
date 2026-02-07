import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../dao/user.dao.js";
import { ConflictError, UnauthorizedError } from "../utils/errHandler.js";
import { signToken } from "../utils/helper.js";

export const registerUser = async ({ username, email, password }) => {


  const user = await findUserByEmail(email);
 
  

  if (user) {
    throw new ConflictError("User already exists");
  }

  const newUser = await createUser({ username, email, password });


  const token = signToken({ id: newUser._id });


  return { token, user: newUser };
};


export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email, true);

  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const token = signToken({ id: user._id });
  return { token, user };
};
