import { checkPassword, createSessionCookie, isAdminPasswordConfigured } from "../../server/auth.js";
import { requireMethod, sendError } from "../../server/http.js";

export default function handler(req, res) {
  if (!requireMethod(req, res, ["POST"])) return;

  if (!isAdminPasswordConfigured()) {
    return sendError(res, 500, "ADMIN_PASSWORD is not set on the server.");
  }
  if (!checkPassword(req.body?.password)) {
    return sendError(res, 401, "Wrong password.");
  }

  res.setHeader("Set-Cookie", createSessionCookie());
  return res.status(200).json({ ok: true });
}
