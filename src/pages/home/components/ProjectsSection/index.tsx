import projectConfigs from "@/src/config/projects";
import useStaggeredFadeIn from "@/src/hooks/useStaggeredFadeIn";
import { useScrollContext } from "../../contexts/ScrollContext";
import ProjectPreview from "./components/ProjectPreview";

export default function ProjectsSection() {
  const { scroller } = useScrollContext();
  const { parentRef } = useStaggeredFadeIn<HTMLDivElement>(scroller, {
    clearProps: "transform",
  });
  const { parentRef: grandparentRef } = useStaggeredFadeIn<HTMLDivElement>(
    scroller,
    {
      attributeName: "data-animate-grandparent",
      clearProps: "transform",
    },
  );

  return (
    <section
      className="flex min-h-screen w-full flex-col items-center justify-center"
      ref={grandparentRef}
      data-animate-grandparent="false"
    >
      <h2 className="text-subtitle font-bold text-purple">Projects</h2>
      <div
        className="mt-4 flex w-full flex-col items-center gap-4 md:grid md:max-w-[45rem] md:grid-cols-[15rem_1fr] md:grid-rows-[12.5rem_12.5rem] md:gap-6"
        ref={parentRef}
      >
        <div className="row-span-2 aspect-square w-full max-w-[15rem] rounded-[1rem] bg-gray-200 md:aspect-auto md:h-full md:max-w-none">
          <ProjectPreview project={projectConfigs.chessApp} />
        </div>
        <div className="aspect-square w-full max-w-[15rem] rounded-[1rem] bg-gray-200 md:aspect-auto md:h-full md:max-w-none">
          <ProjectPreview project={projectConfigs.whischat} />
        </div>
        <div className="aspect-square w-full max-w-[15rem] rounded-[1rem] bg-gray-200 md:aspect-auto md:h-full md:max-w-none">
          <ProjectPreview project={projectConfigs.devforge} />
        </div>
      </div>
    </section>
  );
}
