import { useState, useEffect } from "react";
import { PERSON } from "../data/config";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home",     href: "#home" },
  { label: "About",    href: "#about" },
  { label: "Approach", href: "#process" },
  { label: "Projects", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Contact",  href: "#contact" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    
    // Theme initialization
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
        <div className="wrap navbar__inner">
          {/* Logo */}
          <a href="#home" className="navbar__logo">
            {/* EDIT: replace with your headshot in /public */}
            <img src={PERSON.photo} alt={PERSON.name} className="navbar__avatar" />
            {PERSON.name}
          </a>

          {/* Desktop links */}
          <ul className="navbar__links">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>

          {/* CTA & Theme */}
          <div className="navbar__right">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <a href="#contact" className="btn btn-primary">Let's Talk</a>
          </div>

          {/* Hamburger — mobile */}
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={menuOpen ? "open" : ""} />
            <span className={menuOpen ? "open" : ""} />
            <span className={menuOpen ? "open" : ""} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-menu${menuOpen ? " mobile-menu--open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={close}>
            {l.label}
          </a>
        ))}
        <div style={{ display: 'flex', gap: '12px', marginTop: 12 }}>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <a href="#contact" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={close}>
            Let's Talk
          </a>
        </div>
      </div>
    </>
  );
}
