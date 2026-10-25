import { addMessage } from "../server/store.js";
import { handleFailure, requireMethod, sendError } from "../server/http.js";
import { validateMessage } from "../server/validate.js";

// Public endpoint used by the contact form.
export default async function handler(req, res) {
  if (!requireMethod(req, res, ["POST"])) return;

  const result = validateMessage(req.body);
  if (result.error) {
    return sendError(res, 400, result.error);
  }

  try {
    await addMessage(result.message);
    return res.status(201).json({ ok: true });
  } catch (error) {
    return handleFailure(res, error);
  }
}
