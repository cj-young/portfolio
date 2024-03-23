import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import ScreenLoader from "./components/ScreenLoader";
import SkillsSection from "./components/SkillsSection";
import { useScrollContext } from "./contexts/ScrollContext";

export default function HomePage() {
  return (
    <>
      <MainSection />
      <ScreenLoader />
    </>
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
