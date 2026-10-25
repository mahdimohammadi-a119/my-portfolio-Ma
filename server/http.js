import { isAuthenticated } from "./auth.js";
import { StorageError } from "./store.js";

export function sendError(res, status, message) {
  return res.status(status).json({ error: message });
}

export function requireMethod(req, res, methods) {
  if (methods.includes(req.method)) {
    return true;
  }
  res.setHeader("Allow", methods.join(", "));
  sendError(res, 405, "Method not allowed.");
  return false;
}

export function requireAdmin(req, res) {
  if (isAuthenticated(req)) {
    return true;
  }
  sendError(res, 401, "Please log in to continue.");
  return false;
}

export function handleFailure(res, error) {
  if (error instanceof StorageError) {
    return sendError(res, 503, error.message);
  }
  console.error(error);
  return sendError(res, 500, "Something went wrong on the server.");
}
