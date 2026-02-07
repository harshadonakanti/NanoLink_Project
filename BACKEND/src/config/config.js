const isProd = process.env.NODE_ENV === "production";

// In local development (http://localhost) cookies CANNOT be `secure: true` or `sameSite: "none"`.
// In production with HTTPS, we DO want `secure` + `sameSite: "none"` so that
// the frontend (different origin) can receive the cookie.
export const cookieOptions = {
  httpOnly: true,
  secure: isProd, // true only in production / HTTPS
  sameSite: isProd ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
