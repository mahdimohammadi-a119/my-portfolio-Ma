import { isAuthenticated } from "../../server/auth.js";
import { requireMethod } from "../../server/http.js";

export default function handler(req, res) {
  if (!requireMethod(req, res, ["GET"])) return;

  return res.status(200).json({ authenticated: isAuthenticated(req) });
}
