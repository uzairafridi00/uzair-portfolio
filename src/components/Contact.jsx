import { useState } from "react";
import { PERSON, SOCIALS } from "../data/config";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", subject: "", message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // ─────────────────────────────────────────────────
    // EDIT: Replace this with your real form handler.
    // Options:
    //   • Formspree:  fetch("https://formspree.io/f/YOUR_ID", ...)
    //   • EmailJS:    emailjs.send(...)
    //   • Backend API: fetch("/api/contact", { method:"POST", body:... })
    // ─────────────────────────────────────────────────
    console.log("Form submitted:", form);
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="contact sec">
      <div className="wrap">
        <div className="contact__grid">

          {/* ── Form side ── */}
          <div>
            <div className="sec-label">Get In Touch</div>
            <div className="rule" />
            <h2 className="sec-title">Let's Discuss<br />Your Project</h2>
            <p className="contact__sub">
              Fill out the form and I'll get back to you as soon as possible.
            </p>

            {sent ? (
              <div className="contact__success">
                ✓ Message sent! I'll be in touch shortly.
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="contact__form-row">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry…"
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project…"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary contact__submit">
                  Send Message →
                </button>
              </form>
            )}
          </div>

          {/* ── Info side ── */}
          <div className="contact__info">
            <div>
              <div className="sec-label">Contact Details</div>
              <div className="rule" />
            </div>

            {/* EDIT: email in config.js */}
            <div className="contact__item">
              <div className="contact__item-icon">✉</div>
              <div>
                <div className="contact__item-label">Email</div>
                <a href={`mailto:${PERSON.email}`} className="contact__item-val">
                  {PERSON.email}
                </a>
              </div>
            </div>

            {/* EDIT: location in config.js */}
            <div className="contact__item">
              <div className="contact__item-icon">📍</div>
              <div>
                <div className="contact__item-label">Location</div>
                <div className="contact__item-val">{PERSON.location}</div>
              </div>
            </div>

            {/* EDIT: socials in config.js */}
            <div className="contact__item">
              <div className="contact__item-icon">⬡</div>
              <div>
                <div className="contact__item-label">Social Profiles</div>
                <div className="contact__socials">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="contact__social-btn"
                      title={s.label}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
