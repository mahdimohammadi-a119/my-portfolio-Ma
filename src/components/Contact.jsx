import { useState } from "react";
import { api } from "../lib/api";

const EMPTY_FORM = { name: "", email: "", message: "" };

function Contact({ content }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState({ state: "idle", message: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ state: "sending", message: "" });

    try {
      await api.sendMessage(form);
      setForm(EMPTY_FORM);
      setStatus({ state: "sent", message: "Thanks! Your message has been sent." });
    } catch (error) {
      setStatus({ state: "error", message: error.message });
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-heading">
        <h2>{content.heading}</h2>
        <p>{content.subheading}</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-item">
            <span>✉</span>
            <div>
              <h3>Email</h3>
              <p>{content.email}</p>
            </div>
          </div>

          <div className="contact-item">
            <span>⌕</span>
            <div>
              <h3>Location</h3>
              <p>{content.location}</p>
            </div>
          </div>

          <div className="contact-item">
            <span>↗</span>
            <div>
              <h3>Portfolio</h3>
              <p>{content.role}</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" disabled={status.state === "sending"}>
            {status.state === "sending" ? "Sending…" : "Send Message"}
          </button>

          {status.message && (
            <p className={`form-status ${status.state}`} role="status">
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;
