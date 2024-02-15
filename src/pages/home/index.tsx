import { Canvas } from "@react-three/fiber";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import BlobModel from "./components/mesh-containers/Blob";
import LeftBracket from "./components/mesh-containers/LeftBracket";
import RightBracket from "./components/mesh-containers/RightBracket";

export default function HomePage() {
  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-b from-white to-[#eeeeee]">
        <Canvas>
          <BlobModel />
          <LeftBracket
            scale={0.5}
            rotation={[Math.PI / 2, Math.PI, 0]}
            position={[-16, 0, -9]}
          />
          <RightBracket
            scale={0.5}
            rotation={[Math.PI / 2, Math.PI, 0]}
            position={[16, 0, -9]}
          />
          <ambientLight intensity={4} />
          <directionalLight intensity={4} position={[-20, 20, 20]} />
        </Canvas>
      </div>
      <main className="md:px-39 absolute inset-0 h-full w-full px-12">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}
