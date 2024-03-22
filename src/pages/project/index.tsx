import LeftArrow from "@/src/assets/icons/arrow-left-solid.svg";
import { Project } from "@/src/config/projects";
import { useCanvasPortals } from "@/src/contexts/CanvasPortalsContext";
import useStaggeredFadeIn from "@/src/hooks/useStaggeredFadeIn";
import useMergedRef from "@react-hook/merged-ref";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { OutPortal } from "react-reverse-portal";
import { Link } from "react-router-dom";
import ProjectScreenLoader from "./components/ProjectScreenLoader";
import TechTag from "./components/TechTag";

interface Props {
  project: Project;
}

const IMAGE_DURATION = 6000;

export default function ProjectPage({ project }: Props) {
  const scrollContainerRef = useRef(null);
  const { portalNodes } = useCanvasPortals();
  const topImageRef = useRef<HTMLDivElement>(null);
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const prevImageIndex =
    currentImageIndex === 0 ? project.images.length - 1 : currentImageIndex - 1;
  const isInitialImage = useRef(true);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      isInitialImage.current = false;
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }, IMAGE_DURATION);

    return () => {
      clearInterval(imageInterval);
    };
  }, [project.images]);

  useEffect(() => {
    const topImage = topImageRef.current;
    if (!topImage || isInitialImage.current) {
      return;
    }

    const directions = ["top", "left", "bottom", "right"] as const;
    const animateFrom =
      directions[Math.floor(Math.random() * directions.length)];

    // Temporarily remove the transition so it immediately
    // appears outside the container
    topImage.style.transition = "none";
    topImage.style[animateFrom] = "-100%";
    topImage.style.display = "block";

    // Forces a reflow, which moves the div with the transition removed
    topImage.offsetHeight;

    // Because of the reflow, the div is now outside the container,
    // and it will transition back in if the transition blocker is removed
    topImage.style.transition = "";
    topImage.style[animateFrom] = "0";
  }, [currentImageIndex]);

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
        className="flex flex-col gap-4 py-[3rem]"
        style={
          {
            "--scrollbar-color": project.secondaryColor,
          } as CSSProperties
        }
      >
        <div className="relative z-20 flex flex-col items-center justify-center md:absolute md:bottom-0 md:left-1/2 md:right-0 md:top-0">
          <div className="relative aspect-[16/9] w-[30rem] max-w-[calc(100%_-_2rem)] overflow-hidden rounded-md">
            <div className="absolute inset-0" key={prevImageIndex}>
              <img
                src={project.images[prevImageIndex]}
                className="object-cover object-left-top"
              />
            </div>
            <div
              className="absolute h-full w-full transition-[inset] duration-200"
              ref={topImageRef}
              key={currentImageIndex}
              style={{
                display: isInitialImage.current ? "block" : "none",
              }}
            >
              <img
                src={project.images[currentImageIndex]}
                className="object-cover object-left-top"
              />
            </div>
          </div>
          <div className="z-10 mt-4 flex gap-4" ref={buttonsParentRef}>
            <button className="cursor-pointer rounded-md bg-gray-400 px-3 py-2 text-base font-bold text-white">
              Code
            </button>
            <button className="cursor-pointer rounded-md bg-gray-400 px-3 py-2 text-base font-bold text-white">
              Live
            </button>
          </div>
        </div>
        <div
          className="relative w-full overflow-auto px-10 md:absolute md:inset-0 md:h-full md:px-20"
          ref={scrollContainerRef}
        >
          <div className="w-full md:w-1/2">
            <section
              className="max-h-full w-full md:py-[5rem]"
              ref={useMergedRef(parentRef, techScrollTargetRef)}
            >
              <Link className="flex cursor-pointer items-center gap-2" to="/">
                <div className="flex h-8 w-8 items-center justify-center rounded-[1000vmax] bg-white/25">
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
                {project.name}
              </h1>
              <p
                className="mt-4"
                style={{
                  color: project.textColor,
                }}
              >
                This is a short description of the project. It's just an
                overview, since there is more information below.
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
                voluptatum blanditiis possimus laborum pariatur placeat cum
                eaque cumque, iste a totam quasi quas sint voluptas magni
                obcaecati vero veniam et. Numquam nemo quod ea saepe quam sit,
                unde corrupti assumenda ex doloribus molestiae impedit iure!
                Itaque harum, ab quos expedita cum ad asperiores molestias
                dolores voluptatibus veritatis nostrum ipsam.
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
      </div>
      <ProjectScreenLoader project={project} />
    </>
  );
}
