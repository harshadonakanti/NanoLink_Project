import User from "../models/user.model.js";

export const findUserByEmail = async (email, includePassword = false) => {
  if (includePassword) {
    return User.findOne({ email }).select("+password");
  }
  return User.findOne({ email });
};

export const findUserById = async (id) => {
  return User.findById(id);
};

export const createUser = async ({ username, email, password }) => {
  const user = new User({ username, email, password });
  return user.save();
};

export const getAllUsers = async () => {
  return await UrlModel.find({user:id});
};