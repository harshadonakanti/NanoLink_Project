import { login } from "../store/slices/authSlice";
import { getCurrentUser } from "../api/user.api.js";
import { redirect } from "@tanstack/react-router";

export const checkAuth = async ({ context }) => {
  const { store } = context;

  try {
    const res = await getCurrentUser(); // 🔥 direct API call
    
    store.dispatch(login(res.user));
     
    return true;
  } catch {
    throw redirect({ to: "/auth" });
  }
};
