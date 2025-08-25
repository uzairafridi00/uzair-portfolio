import { useEffect, useState } from "react";
import { getProjects } from "./services/api";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then(data => setProjects(data));
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        🚀 My Personal Website
      </h1>
      <p className="mb-6">This site is powered by React + FastAPI</p>
      <h2 className="text-2xl font-semibold mb-2">Projects</h2>
      <ul className="space-y-2">
        {projects.map((proj, i) => (
          <li key={i} className="border p-3 rounded shadow">
            <strong>{proj.title}</strong> - {proj.tech}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;