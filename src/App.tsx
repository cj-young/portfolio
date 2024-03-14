import { Route, Routes } from "react-router-dom";
import projectConfigs from "./config/projects";
import HomePage from "./pages/home";
import ProjectPage from "./pages/project";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {Object.entries(projectConfigs).map(([key, project]) => (
        <Route
          path={`/projects/${project.id}`}
          element={<ProjectPage project={project} />}
          key={key}
        />
      ))}
    </Routes>
  );
}
