import { getContent } from "../server/store.js";
import { handleFailure, requireMethod } from "../server/http.js";

export default async function handler(req, res) {
  if (!requireMethod(req, res, ["GET"])) return;

  try {
    const content = await getContent();
    res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=60");
    return res.status(200).json(content);
  } catch (error) {
    return handleFailure(res, error);
  }
}
