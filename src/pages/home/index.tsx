import { Canvas } from "@react-three/fiber";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";

export default function HomePage() {
  return (
    <>
      <Canvas>
        <ambientLight intensity={0.125} />
      </Canvas>
      <main className="md:px-39 absolute inset-0 h-full w-full overflow-y-auto px-12">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}
