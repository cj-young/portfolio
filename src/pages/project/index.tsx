import LeftArrow from "@/src/assets/icons/arrow-left-solid.svg";
import { Project } from "@/src/config/projects";
import { useCanvasPortals } from "@/src/contexts/CanvasPortalsContext";
import useStaggeredFadeIn from "@/src/hooks/useStaggeredFadeIn";
import useMergedRef from "@react-hook/merged-ref";
import { useRef } from "react";
import { OutPortal } from "react-reverse-portal";
import { Link } from "react-router-dom";
import TechTag from "./components/TechTag";

interface Props {
  project: Project;
}

export default function ProjectPage({ project }: Props) {
  const scrollContainerRef = useRef(null);
  const { portalNodes } = useCanvasPortals();
  const { parentRef } = useStaggeredFadeIn<HTMLHeadingElement>(
    scrollContainerRef,
    {
      attributeName: "data-animate-grandparent",
    },
  );

  const { parentRef: techParentRef, scrollTargetRef: techScrollTargetRef } =
    useStaggeredFadeIn<HTMLUListElement, HTMLDivElement>(scrollContainerRef);

  const { parentRef: buttonsParentRef } =
    useStaggeredFadeIn<HTMLDivElement>(scrollContainerRef);

  const portalNode = portalNodes.get(project.id);

  return (
    <>
      <div
        className="fixed inset-0 bg-gradient-to-b"
        style={{
          backgroundColor: project.backgroundColor,
        }}
      >
        {portalNode && <OutPortal node={portalNode} isPreview={false} />}
      </div>

      <div
        className="absolute inset-0 h-full w-full overflow-auto px-10 md:px-20"
        ref={scrollContainerRef}
      >
        <div className="w-full md:w-1/2">
          <section
            className="max-h-full w-full py-[5rem]"
            ref={useMergedRef(parentRef, techScrollTargetRef)}
          >
            <Link className="flex cursor-pointer items-center gap-2" to="/">
              <div className="flex h-8 w-8 items-center justify-center rounded-[1000vmax] bg-white/50">
                <img src={LeftArrow} alt="" className="h-4 w-4" />
              </div>
              <span className="font-bold text-white">Back</span>
            </Link>
            <h1
              className="mt-4 text-5xl font-bold"
              style={{
                color: project.titleColor,
              }}
            >
              Project Name
            </h1>
            <p
              className="mt-4"
              style={{
                color: project.textColor,
              }}
            >
              This is a short description of the project. It's just an overview,
              since there is more information below.
            </p>

            <ul
              ref={techParentRef}
              className="mt-2 flex flex-wrap gap-2"
              data-animate-grandparent="false"
            >
              <TechTag
                name="Tech 1"
                textColor="#ffffff"
                backgroundColor="#ffffff80"
              />
              <TechTag
                name="Tech 2"
                textColor="#2fde77"
                backgroundColor="#148f4780"
              />
              <TechTag
                name="Tech 3"
                textColor="#e096bc"
                backgroundColor="#ab487b80"
              />
              <TechTag
                name="Tech 4"
                textColor="#9cd6e6"
                backgroundColor="#438ca180"
              />
            </ul>

            <h2
              className="mt-8 text-2xl font-bold"
              style={{
                color: project.titleColor,
              }}
            >
              More information
            </h2>
            <p
              className="mt-2 max-w-[50ch]"
              style={{
                color: project.textColor,
              }}
            >
              This is a more detailed description of the project. Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Sed quibusdam
              voluptatum blanditiis possimus laborum pariatur placeat cum eaque
              cumque, iste a totam quasi quas sint voluptas magni obcaecati vero
              veniam et. Numquam nemo quod ea saepe quam sit, unde corrupti
              assumenda ex doloribus molestiae impedit iure! Itaque harum, ab
              quos expedita cum ad asperiores molestias dolores voluptatibus
              veritatis nostrum ipsam.
            </p>
            <p
              className="mt-2 max-w-[50ch]"
              style={{
                color: project.textColor,
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              ipsum doloremque ipsam non illum amet quos quae necessitatibus
              iste exercitationem veniam, quidem, sint ratione. Repudiandae
              itaque quibusdam fugiat, necessitatibus in a voluptatum nobis
              numquam.
            </p>
            <p
              className="mt-2 max-w-[50ch]"
              style={{
                color: project.textColor,
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis mollitia eaque beatae. Nulla, voluptates non.
            </p>
          </section>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 right-0 top-0 flex flex-col items-center justify-center">
        <div className="aspect-[16/9] w-[30rem] max-w-[calc(100%_-_2rem)] overflow-hidden rounded-md">
          <img src={project.images[0]} className="object-cover" />
        </div>
        <div className="mt-4 flex gap-4" ref={buttonsParentRef}>
          <button className="cursor-pointer rounded-md bg-gray-400 px-3 py-2 text-base font-bold text-white">
            Code
          </button>
          <button className="cursor-pointer rounded-md bg-gray-400 px-3 py-2 text-base font-bold text-white">
            Live
          </button>
        </div>
      </div>
    </>
  );
}
