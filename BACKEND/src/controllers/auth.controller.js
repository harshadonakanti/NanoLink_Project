import { cookieOptions } from "../config/config.js";
import { loginUser, registerUser } from "../services/auth.service.js";
import tryCatchWrapper from "../utils/tryCatchWrapper.js";

export const register_user = tryCatchWrapper(async (req, res) => {


  const { username, email, password } = req.body;


  const { token, user } = await registerUser({
    username,
    email,
    password,
  });


  res.cookie("accessToken", token, cookieOptions);
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user,
    token,
    
  });

});

export const login_user = tryCatchWrapper(async (req, res) => {
  const { email, password } = req.body;

  const { token, user } = await loginUser(email, password);

  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user,
    token,
  });
});

export const logout_user = tryCatchWrapper(async (req, res) => {
  res.clearCookie("accessToken", cookieOptions);
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
});

export const get_current_user = tryCatchWrapper(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});