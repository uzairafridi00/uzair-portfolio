import { PERSON, SOCIALS } from "../data/config";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__logo">{PERSON.name}</div>

        <div className="footer__socials">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="footer__social"
              title={s.label}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* EDIT: year auto-updates */}
        <div className="footer__copy">
          Copyright © {new Date().getFullYear()} {PERSON.name}
        </div>
      </div>
    </footer>
  );
}
