import { clearSessionCookie } from "../../server/auth.js";
import { requireMethod } from "../../server/http.js";

export default function handler(req, res) {
  if (!requireMethod(req, res, ["POST"])) return;

  res.setHeader("Set-Cookie", clearSessionCookie());
  return res.status(200).json({ ok: true });
}
