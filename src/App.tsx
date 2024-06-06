import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import { Analytics } from "@vercel/analytics/react";
import gsap from "gsap";
import CSSPlugin from "gsap/CSSPlugin";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import projectConfigs from "./config/projects";
import HomePage from "./pages/home";
import BlobModel from "./pages/home/components/mesh-containers/Blob";
import LeftBracket from "./pages/home/components/mesh-containers/LeftBracket";
import RightBracket from "./pages/home/components/mesh-containers/RightBracket";
import SkillSectionLogos from "./pages/home/components/mesh-containers/SkillSectionLogos";
import ProjectPage from "./pages/project";

gsap.registerPlugin(ScrollTrigger, CSSPlugin, Flip, useGSAP);

// @ts-ignore
window.scrollTrigger = ScrollTrigger;

export default function App() {
  const { pathname } = useLocation();

  return (
    <>
      <div
        className="fixed inset-0 bg-gradient-to-b from-white to-[#eeeeee]"
        style={{
          visibility: pathname === "/" ? "visible" : "visible",
        }}
      >
        <Canvas flat>
          <BlobModel />
          <LeftBracket scale={0.5} position={[-16, 0, -9]} />
          <RightBracket scale={0.5} position={[16, 0, -9]} />
          <SkillSectionLogos />
          <ambientLight intensity={2} />
          <directionalLight intensity={1.5} position={[-1, 2, 2]} />
        </Canvas>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {Object.entries(projectConfigs).map(([key, project]) => (
          <Route
            path={`/projects/${project.id}`}
            element={<ProjectPage project={project} />}
            key={key}
          />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Analytics />
    </>
  );
}
