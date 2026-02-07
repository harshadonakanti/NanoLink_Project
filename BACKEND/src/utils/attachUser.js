import { verifyToken } from "./helper.js";
import { findUserById } from "../dao/user.dao.js";

export const attachUser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.split(" ")[1];

    if (!token) return next();

    const decoded = verifyToken(token);
    const user = await findUserById(decoded._id);

    if (!user) return next();

    req.user = user;
    next();
  } catch (err) {
    // invalid / expired token → ignore
    next();
  }
};
