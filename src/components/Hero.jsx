import { PERSON, STATS, SOCIALS } from "../data/config";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="home" className="hero sec">
      {/* Background orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />

      <div className="wrap">
        <div className="hero__grid">

          {/* ── Left: Text ── */}
          <div className="hero__content">
            {PERSON.available && (
              <div className="hero__badge fade-up d1">
                <span className="hero__badge-dot" />
                {PERSON.availableText}
              </div>
            )}

            <h1 className="hero__title fade-up d2">
              Hello, I'm
              <span className="hero__title-accent">{PERSON.name}</span>
            </h1>

            <p className="hero__desc fade-up d3">{PERSON.bio}</p>

            <div className="hero__actions fade-up d4">
              <div className="hero__btns">
                <a href="#contact" className="btn btn-primary">Let's Talk</a>
                {/* EDIT: your CV PDF must be in /public folder */}
                <a href={PERSON.cvUrl} className="btn btn-ghost" download>
                  Download CV
                </a>
              </div>

              {/* <div className="hero__socials">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hero__social-btn"
                    title={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div> */}
            </div>

            {/* Stats */}
            <div className="hero__stats fade-up d5">
              {STATS.map((s) => (
                <div key={s.label} className="hero__stat">
                  <div className="hero__stat-num">
                    {s.number.replace(/\+/, "")}
                    <em>{s.number.includes("+") ? "+" : ""}</em>
                  </div>
                  <div className="hero__stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Photo ── */}
          <div className="hero__photo-wrap fade-up d3">
            <div className="hero__photo-border" />
            <div className="hero__photo-frame">
              {/* EDIT: place your portrait at /public/profile.jpg */}
              <img src={PERSON.photo} alt={PERSON.name} />
            </div>
            <div className="hero__float-card">
              <p>Status</p>
              <strong>{PERSON.availableText}</strong>
            </div>
            <div className="hero__float-tag">
              {PERSON.title.split(" ")[0]}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
