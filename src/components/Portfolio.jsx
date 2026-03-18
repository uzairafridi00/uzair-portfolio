import { PROJECTS } from "../data/config";
import "./Portfolio.css";

export default function Portfolio() {
  return (
    <section id="portfolio" className="portfolio sec">
      <div className="wrap">

        {/* Header */}
        <div className="portfolio__head">
          <div>
            <div className="sec-label">My Work</div>
            <div className="rule" />
            <h2 className="sec-title">Selected Projects</h2>
          </div>
          <p className="sec-sub">
            A few highlights spanning different domains and challenges.
          </p>
        </div>

        {/* EDIT: projects in PROJECTS array in config.js */}
        <div className="portfolio__grid">
          {PROJECTS.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-card__img">
                {/* EDIT: place images in /public/portfolio/ */}
                <img src={project.image} alt={project.title} loading="lazy" />
              </div>
              <div className="project-card__body">
                <div className="project-card__tag">{project.tag}</div>
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.desc}</p>
                <div className="project-card__links">
                  {project.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.url}
                      className="project-card__link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="portfolio__cta">
          <h1>Have a use case in mind? Let's build it.</h1>
          <p>
            Whether you need an AI agent, a voice assistant, an analytics pipeline, or a production ML model—I'll help you go from concept to deployed solution with measurable results.</p>
          <a href="#contact" className="btn btn-primary">Let's Work Together</a>
        </div>

      </div>
    </section>
  );
}
