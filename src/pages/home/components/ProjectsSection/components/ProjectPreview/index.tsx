import { Project } from "@/src/config/projects";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { MouseEvent, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  project: Project;
}

export default function ProjectPreview({ project }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const navigate = useNavigate();

  function handleClick(e: MouseEvent) {
    e.preventDefault();
    const overlay = overlayRef.current;
    const link = linkRef.current;
    if (!overlay || !link) return;

    gsap.registerPlugin(Flip);
    const state = Flip.getState(link, {
      props: "borderRadius",
    });

    const onComplete = () => {
      navigate(`/projects/${project.id}`);
    };

    overlay.style.display = "block";
    link.style.display = "none";

    Flip.from(state, {
      duration: 0.5,
      ease: "power2.inOut",
      onComplete,
      targets: [overlay],
    });
  }

  return (
    <>
      <Link
        className="block h-full w-full cursor-pointer rounded-md"
        to={`/projects/${project.id}`}
        onClick={handleClick}
        ref={linkRef}
        data-flip-id="container"
        style={{
          backgroundColor: project.backgroundColor,
        }}
      >
        <span className="absolute bottom-4 right-4 text-2xl font-bold text-white">
          {project.name}
        </span>
      </Link>
      {createPortal(
        <div
          className="fixed inset-0 hidden"
          ref={overlayRef}
          data-flip-id="container"
          style={{
            backgroundColor: project.backgroundColor,
          }}
        ></div>,
        document.body,
      )}
    </>
  );
}
