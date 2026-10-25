import { deleteMessage, listMessages } from "../../server/store.js";
import { handleFailure, requireAdmin, requireMethod, sendError } from "../../server/http.js";

export default async function handler(req, res) {
  if (!requireMethod(req, res, ["GET", "DELETE"])) return;
  if (!requireAdmin(req, res)) return;

  try {
    if (req.method === "GET") {
      return res.status(200).json({ messages: await listMessages() });
    }

    const id = new URL(req.url, "http://localhost").searchParams.get("id");
    if (!id) {
      return sendError(res, 400, "Missing message id.");
    }
    await deleteMessage(id);
    return res.status(200).json({ ok: true });
  } catch (error) {
    return handleFailure(res, error);
  }
}
