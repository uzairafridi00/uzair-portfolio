import { PROCESS } from "../data/config";
import "./Process.css";

export default function Process() {
  return (
    <section id="process" className="process sec">
      <div className="wrap">
        <div className="process__header">
          <div className="sec-label">My Process</div>
          <div className="rule" style={{ margin: "14px auto 18px" }} />
          <h2 className="sec-title">How I Deliver</h2>
          <p className="sec-sub" style={{ margin: "0 auto" }}>
            A simple, execution-first process — from problem to shipped solution
            with clear milestones and measurable outcomes.
          </p>
        </div>

        {/* EDIT: steps in PROCESS array in config.js */}
        <div className="process__grid">
          {PROCESS.map((step) => (
            <div key={step.num} className="process__card">
              <div className="process__num">{step.num}</div>
              <div className="process__title">{step.title}</div>
              <p className="process__desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
