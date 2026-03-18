import { PERSON, WHY_ME, SKILLS } from "../data/config";
import "./About.css";

export default function About() {
  return (
    <section id="about" className="about sec">
      <div className="wrap">
        <div className="about__grid">

          {/* ── Left: Why work with me ── */}
          <div>
            <div className="sec-label">About Me</div>
            <div className="rule" />
            <h2 className="sec-title">Why Work<br />With Me</h2>

            {/* EDIT: WHY_ME list in config.js */}
            <ul className="about__why-list">
              {WHY_ME.map((item) => (
                <li key={item}>
                  <span className="about__check">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="about__btns">
              <a href="#portfolio" className="btn btn-ghost">View My Projects</a>
              <a href={PERSON.cvUrl} className="btn btn-primary" download>Download CV</a>
            </div>
          </div>

          {/* ── Right: Skills ── */}
          <div>
            <div className="sec-label">Background</div>
            <div className="rule" />
            <h2 className="sec-title about__skills-title">Skills &amp; Tech Stack</h2>

            {/* EDIT: bio in config.js */}
            <p className="about__bio">{PERSON.bio}</p>

            {/* EDIT: SKILLS array in config.js */}
            <div className="about__skill-tags">
              {SKILLS.map((s) => (
                <span key={s} className="about__skill-tag">{s}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
