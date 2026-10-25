import { useEffect, useState } from "react";
import { api } from "../lib/api";

function MessagesPanel({ onUnauthorized }) {
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .listMessages()
      .then((data) => setMessages(data.messages))
      .catch((err) => (err.status === 401 ? onUnauthorized() : setError(err.message)));
  }, [onUnauthorized]);

  async function handleDelete(id) {
    if (!window.confirm("Delete this message?")) return;

    try {
      await api.deleteMessage(id);
      setMessages((prev) => prev.filter((message) => message.id !== id));
    } catch (err) {
      if (err.status === 401) return onUnauthorized();
      setError(err.message);
    }
  }

  if (error) return <p className="admin-error">{error}</p>;
  if (!messages) return <p>Loading messages…</p>;
  if (messages.length === 0) return <p>No messages yet.</p>;

  return (
    <div className="admin-messages">
      <h2>Messages</h2>
      {messages.map((message) => (
        <article className="admin-message" key={message.id}>
          <header>
            <div>
              <strong>{message.name}</strong>{" "}
              <a href={`mailto:${message.email}`}>{message.email}</a>
            </div>
            <time dateTime={message.createdAt}>
              {new Date(message.createdAt).toLocaleString()}
            </time>
          </header>
          <p>{message.message}</p>
          <button type="button" className="danger" onClick={() => handleDelete(message.id)}>
            Delete
          </button>
        </article>
      ))}
    </div>
  );
}

export default MessagesPanel;
