// ============================================================
//  config.js  —  EDIT ALL YOUR CONTENT HERE
//  This is the only file you need to update to personalize
//  your portfolio. Components read from this file.
// ============================================================

export const PERSON = {
  name: "Muhammad Uzair Afridi",                          // EDIT
  title: "AI Engineer building AI agents, automations, and production ML systems",           // EDIT
  bio: "IBM certified Data Scientist and AI Expert with 4+ years of industry experience across product and service-based teams. I build real-world AI and automation systems from voice agents and RAG chatbots to ML forecasting, fraud detection, and analytics pipelines, focused on measurable business impact.", // EDIT
  email: "uzairafrididev@gmail.com",                   // EDIT
  location: "Riyadh, KSA",             // EDIT
  cvUrl: "/resume.pdf",                  // EDIT — place PDF in /public folder
  photo: "/profile.png",                      // EDIT — place image in /public folder
  available: true,                            // EDIT — shows green "available" badge
  availableText: "Open to new opportunities",    // EDIT
};

export const STATS = [
  { number: "4+", label: "Years Experience" },   // EDIT
  { number: "20+", label: "Projects Delivered" }, // EDIT
  { number: "10+", label: "Happy Clients" },      // EDIT
];

export const SOCIALS = [
  { label: "GitHub", icon: "GH", url: "https://github.com/uzairafridi00" },       // EDIT
  { label: "LinkedIn", icon: "LI", url: "https://linkedin.com/in/uzair-afridi00" },  // EDIT
  { label: "Twitter", icon: "TW", url: "https://x.com/uzair__afridi" },      // EDIT
];

export const WHY_ME = [
  "Production-ready solutions, not prototypes",            // EDIT
  "Business-first problem solving",                        // EDIT
  "End-to-end ownership of every project",                 // EDIT
  "Clear milestones & stakeholder communication",          // EDIT
  "Scalable, maintainable, documented code",               // EDIT
];

export const SKILLS = [
  "Python", "Machine Learning", "React",
  "AWS", "Docker", "PostgreSQL", "MLOps", "GenAI",
  "LangChain", "LLMs", "RAG", "Voice Agents",
  "Forecasting", "Fraud Detection", "Analytics Pipelines",
]; // EDIT — add or remove skill tags

export const PROCESS = [
  {
    num: "01",
    title: "Discovery",
    desc: "Align on business goal, data availability, constraints, and success metrics.",
  },
  {
    num: "02",
    title: "Design",
    desc: "Choose the right approach and define architecture + integrations.",
  },
  {
    num: "03",
    title: "Build & Validate",
    desc: "Implement, test with real data, and iterate with stakeholder feedback.",
  },
  {
    num: "04",
    title: "Deploy & Monitor",
    desc: "Ship to production, add monitoring, and optimize for reliability and cost.",
  },
]; // EDIT

export const PROJECTS = [
  {
    id: 1,
    tag: "CATEGORY / TYPE",                   // EDIT e.g. "FULL STACK / WEB APP"
    title: "Project Title One",               // EDIT
    desc: "Brief description of what you built, the tech stack, and the business impact achieved.", // EDIT
    image: "/portfolio/project1.png",         // EDIT — place image in /public/portfolio/
    links: [
      { label: "View Code", url: "https://github.com/you/project1" }, // EDIT
      { label: "Live Demo", url: "https://project1.com" },            // EDIT
    ],
  },
  {
    id: 2,
    tag: "CATEGORY / TYPE",
    title: "Project Title Two",
    desc: "Brief description of what you built, the tech stack, and the business impact achieved.",
    image: "/portfolio/project2.png",
    links: [
      { label: "View Code", url: "#" },
    ],
  },
  {
    id: 3,
    tag: "CATEGORY / TYPE",
    title: "Project Title Three",
    desc: "Brief description of what you built, the tech stack, and the business impact achieved.",
    image: "/portfolio/project3.png",
    links: [
      { label: "Visit Website", url: "#" },
    ],
  },
  {
    id: 4,
    tag: "CATEGORY / TYPE",
    title: "Project Title Four",
    desc: "Brief description of what you built, the tech stack, and the business impact achieved.",
    image: "/portfolio/project4.png",
    links: [
      { label: "Case Study", url: "#" },
    ],
  },
  {
    id: 5,
    tag: "CATEGORY / TYPE",
    title: "Project Title Five",
    desc: "Brief description of what you built, the tech stack, and the business impact achieved.",
    image: "/portfolio/project5.png",
    links: [
      { label: "View Code", url: "#" },
      { label: "Live Demo", url: "#" },
    ],
  },
  {
    id: 6,
    tag: "CATEGORY / TYPE",
    title: "Project Title Six",
    desc: "Brief description of what you built, the tech stack, and the business impact achieved.",
    image: "/portfolio/project6.png",
    links: [
      { label: "Visit Website", url: "#" },
    ],
  },
]; // EDIT — add or remove project objects freely

export const SERVICES = [
  {
    icon: "◈",
    title: "AI Agents & Agentic Workflows",    // EDIT
    desc: "LangGraph/LangChain agents for email, calendar, WhatsApp, CRM and internal tools—built with guardrails and integrations.", // EDIT
  },
  {
    icon: "⬡",
    title: "Voice AI Assistants",    // EDIT
    desc: "Twilio-based calling, appointment booking, call transcription, sentiment + insights, and dashboards for support/sales operations.", // EDIT
  },
  {
    icon: "⬟",
    title: "Data Science & Analytics",  // EDIT
    desc: "Forecasting, recommendations, fraud detection, NLP insights, and KPI dashboards to drive data-informed decisions.", // EDIT
  },
  {
    icon: "◉",
    title: "ML Development & Deployment",   // EDIT
    desc: "End-to-end pipelines (Airflow, GCP/AWS, APIs) with monitoring, reliability, and scalable architecture.", // EDIT
  },
]; // EDIT

export const METRICS = [
  { number: "$10K/mo", label: "Reduced support costs via automation" },       // EDIT
  { number: "45%", label: "Reduced loss using demand forecasting" },       // EDIT
  { number: "99%", label: "Pipeline reliability on cloud infra" },         // EDIT
  { number: "+15%", label: "Revenue increase via recommendation engine" },  // EDIT
]; // EDIT
