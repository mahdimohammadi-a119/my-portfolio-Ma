async function request(path, { method = "GET", body } = {}) {
  const response = await fetch(`/api${path}`, {
    method,
    headers: body === undefined ? {} : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || `Request failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return data;
}

export const api = {
  getContent: () => request("/content"),
  sendMessage: (message) => request("/messages", { method: "POST", body: message }),

  checkSession: () => request("/admin/session"),
  login: (password) => request("/admin/login", { method: "POST", body: { password } }),
  logout: () => request("/admin/logout", { method: "POST" }),
  saveSection: (section, data) => request("/admin/content", { method: "PUT", body: { section, data } }),
  listMessages: () => request("/admin/messages"),
  deleteMessage: (id) => request(`/admin/messages?id=${encodeURIComponent(id)}`, { method: "DELETE" }),
};
