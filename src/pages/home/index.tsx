import { Canvas } from "@react-three/fiber";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import ScreenLoader from "./components/ScreenLoader";
import SkillsSection from "./components/SkillsSection";
import BlobModel from "./components/mesh-containers/Blob";
import LeftBracket from "./components/mesh-containers/LeftBracket";
import RightBracket from "./components/mesh-containers/RightBracket";
import SkillSectionLogos from "./components/mesh-containers/SkillSectionLogos";
import ScrollContextProvider, {
  useScrollContext,
} from "./contexts/ScrollContext";

export default function HomePage() {
  return (
    <ScrollContextProvider>
      <>
        <div className="fixed inset-0 bg-gradient-to-b from-white to-[#eeeeee]">
          <Canvas flat>
            <BlobModel />
            <LeftBracket scale={0.5} position={[-16, 0, -9]} />
            <RightBracket scale={0.5} position={[16, 0, -9]} />
            <SkillSectionLogos />
            <ambientLight intensity={2} />
            <directionalLight intensity={1.5} position={[-1, 2, 2]} />
          </Canvas>
        </div>
        <MainSection />
      </>
      <ScreenLoader />
    </ScrollContextProvider>
  );
}

function MainSection() {
  const { scroller } = useScrollContext();

  return (
    <main
      className="absolute inset-0 h-full w-full overflow-auto px-4 md:px-3"
      ref={scroller}
    >
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
