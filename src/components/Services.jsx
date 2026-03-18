import { SERVICES, METRICS } from "../data/config";
import "./Services.css";

export default function Services() {
  return (
    <section id="services" className="services sec">
      <div className="wrap">

        {/* Header */}
        <div className="services__head">
          <div>
            <div className="sec-label">What I Offer</div>
            <div className="rule" />
            <h2 className="sec-title">Services</h2>
          </div>
          <p className="sec-sub">
            Practical engineering services designed to automate operations,
            improve decision-making, and ship reliable products.
          </p>
        </div>

        {/* EDIT: services in SERVICES array in config.js */}
        <div className="services__grid">
          {SERVICES.map((s) => (
            <div key={s.title} className="service-card">
              <div className="service-card__icon">{s.icon}</div>
              <div className="service-card__title">{s.title}</div>
              <p className="service-card__desc">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* EDIT: metrics in METRICS array in config.js */}
        <div className="services__metrics">
          {METRICS.map((m) => (
            <div key={m.label} className="metric-item">
              <div className="metric-item__num">{m.number}</div>
              <div className="metric-item__label">{m.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
