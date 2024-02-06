import { Canvas } from "@react-three/fiber";
import AboutSection from "./components/AboutSection";
import BlobModel from "./components/Blob";
import ContactSection from "./components/ContactSection";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";

export default function HomePage() {
  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-b from-white to-[#eeeeee]">
        <Canvas>
          <BlobModel />
          <ambientLight intensity={3} />
          <pointLight intensity={30} position={[-1.5, 1.75, 3]} />
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
