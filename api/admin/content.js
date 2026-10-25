import { getContent, saveContent } from "../../server/store.js";
import { handleFailure, requireAdmin, requireMethod, sendError } from "../../server/http.js";
import { sanitizeSection } from "../../server/validate.js";

export default async function handler(req, res) {
  if (!requireMethod(req, res, ["PUT"])) return;
  if (!requireAdmin(req, res)) return;

  const { section, data } = req.body ?? {};
  const cleaned = sanitizeSection(section, data);
  if (!cleaned) {
    return sendError(res, 400, "Unknown section.");
  }

  try {
    const content = { ...(await getContent()), [section]: cleaned };
    await saveContent(content);
    return res.status(200).json({ ok: true, content });
  } catch (error) {
    return handleFailure(res, error);
  }
}
