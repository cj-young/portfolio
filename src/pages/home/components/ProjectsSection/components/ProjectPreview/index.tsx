import { Project } from "@/src/config/projects";
import { useCanvasPortals } from "@/src/contexts/CanvasPortalsContext";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useEffect, useRef } from "react";
import { OutPortal } from "react-reverse-portal";
import { Link, useNavigate } from "react-router-dom";
import { Group } from "three";

const TRANSITION_DURATION = 1;
const TRANSITION_EASE = "power2.inOut";

interface Props {
  project: Project;
}

export default function ProjectPreview({ project }: Props) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const navigate = useNavigate();
  const modelsRef = useRef<(Group | null)[]>([]);
  const placeholderButtonsRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const imagesParentRef = useRef<HTMLDivElement>(null);
  const previewContentRef = useRef<HTMLDivElement>(null);
  const unfilteredImageRef = useRef<HTMLImageElement>(null);
  const { portalNodes } = useCanvasPortals();

  const portalNode = portalNodes.get(project.id);

  useEffect(() => {
    modelsRef.current = modelsRef.current.slice(0, project.models.length);
  }, [project]);

  useEffect(() => {
    const link = linkRef.current;
    if (!link) return;

    link.addEventListener("click", handleClick);

    return () => {
      link.removeEventListener("click", handleClick);
    };
  }, []);

  function handleClick(e: MouseEvent) {
    e.preventDefault();
    const link = linkRef.current;
    if (!link) return;

    gsap.registerPlugin(Flip);
    const state = Flip.getState(link, {
      props: "borderRadius",
    });

    const imagesParent = imagesParentRef.current;
    const images = imagesRef.current;
    const placeholderButtons = placeholderButtonsRef.current;
    const unfilteredImage = unfilteredImageRef.current;

    const onComplete = () => {
      navigate(`/projects/${project.id}`);
    };

    link.style.position = "fixed";
    link.style.inset = "0";
    link.style.zIndex = "1000";
    link.style.borderRadius = "0";

    // parent of imagesParent has py-4 in real layout, so margin has to be added
    const currentParentClasses = [
      "absolute",
      "inset-0",
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
    ];
    const transformedParentClasses = [
      "static",
      "z-20",
      "mt-[3rem]",
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "md:absolute",
      "md:mt-0",
      "md:bottom-0",
      "md:left-1/2",
      "md:right-0",
      "md:top-0",
      "bg-red-500",
    ];
    if (imagesParent) {
      imagesParent.classList.remove(...currentParentClasses);
      imagesParent.classList.add(...transformedParentClasses);
    }

    const currentImagesClasses = [
      "absolute",
      "aspect-[16/9]",
      "w-[16rem]",
      "overflow-hidden",
      "rounded-md",
    ];
    const transformedImagesClasses = [
      "relative",
      "aspect-[16/9]",
      "w-[30rem]",
      "max-w-[calc(100%_-_2rem)]",
      "overflow-hidden",
      "rounded-md",
    ];
    if (images) {
      images.style.inset = "auto";
      images.classList.remove(...currentImagesClasses);
      images.classList.add(...transformedImagesClasses);
    }

    if (placeholderButtons) {
      placeholderButtons.style.display = "flex";
    }

    if (imagesParent && images) {
      const imagesBoundingRect = images.getBoundingClientRect();
      const newImageTop = imagesBoundingRect.top;
      const newImageLeft = imagesBoundingRect.left;
      const newImageWidth = images.offsetWidth;
      const newImageHeight = images.offsetHeight;
      images.style.inset = project.previewImageInset;
      images.classList.remove(...transformedImagesClasses);
      images.classList.add(...currentImagesClasses);
      imagesParent.classList.remove(...transformedParentClasses);
      imagesParent.classList.add(...currentParentClasses);
      gsap.to(images, {
        left: newImageLeft,
        top: newImageTop,
        width: newImageWidth,
        height: newImageHeight,
        duration: TRANSITION_DURATION,
        ease: TRANSITION_EASE,
      });
    }

    if (unfilteredImage) {
      gsap.to(unfilteredImage, {
        opacity: 1,
        duration: TRANSITION_DURATION,
        ease: TRANSITION_EASE,
      });
    }

    Flip.from(state, {
      duration: TRANSITION_DURATION,
      ease: TRANSITION_EASE,
      onComplete,
    });

    for (let i = 0; i < project.models.length; i++) {
      const model = project.models[i];
      const modelEl = modelsRef.current[i];
      if (!model.isInPreview || !modelEl) return;

      const newPosition = model.props.position ?? [0, 0, 0];
      gsap.to(modelEl.position, {
        x: newPosition[0],
        y: newPosition[1],
        z: newPosition[2],
        duration: TRANSITION_DURATION,
        ease: TRANSITION_EASE,
      });

      const newRotation = model.props.rotation ?? [0, 0, 0];
      gsap.to(modelEl.rotation, {
        x: newRotation[0],
        y: newRotation[1],
        z: newRotation[2],
        duration: TRANSITION_DURATION,
        ease: TRANSITION_EASE,
      });

      const newScale = model.props.scale ?? [1, 1, 1];
      gsap.to(modelEl.scale, {
        x: newScale[0],
        y: newScale[1],
        z: newScale[2],
        duration: TRANSITION_DURATION,
        ease: TRANSITION_EASE,
      });
    }

    if (previewContentRef.current) {
      gsap.to(previewContentRef.current, {
        opacity: 0,
        duration: TRANSITION_DURATION,
        ease: TRANSITION_EASE,
      });
    }
  }

  return (
    <>
      <Link
        className="relative block h-full w-full cursor-pointer overflow-hidden rounded-md"
        to={`/projects/${project.id}`}
        ref={linkRef}
        data-flip-id="container"
        style={{
          backgroundColor: project.backgroundColor,
        }}
      >
        {portalNode && (
          <div className="pointer-events-none absolute inset-0">
            <OutPortal
              node={portalNode}
              isPreview={true}
              modelsRef={modelsRef}
            />
          </div>
        )}
        {project.images.length > 0 && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            ref={imagesParentRef}
          >
            <div
              className="absolute aspect-[16/9] w-[16rem] overflow-hidden rounded-md"
              style={{
                inset: project.previewImageInset,
              }}
              ref={imagesRef}
            >
              <img
                src={project.previewImage}
                className="absolute inset-0 object-cover"
              />
              <img
                src={project.images[0]}
                ref={unfilteredImageRef}
                className="absolute inset-0 object-cover opacity-0"
              />
            </div>
            {(project.links?.code || project.links?.live) && (
              <div
                className="invisible mt-4 hidden gap-4"
                ref={placeholderButtonsRef}
              >
                {project.links?.code && (
                  <a className="block cursor-pointer rounded-md bg-gray-400 px-3 py-2 text-base font-bold text-white">
                    Code
                  </a>
                )}
                {project.links?.live && (
                  <a className="cursor-pointer rounded-md bg-gray-400 px-3 py-2 text-base font-bold text-white">
                    Live
                  </a>
                )}
              </div>
            )}
          </div>
        )}
        <div ref={previewContentRef}>
          <span className="absolute bottom-4 right-4 text-2xl font-bold text-white">
            {project.name}
          </span>
        </div>
      </Link>
    </>
  );
}
