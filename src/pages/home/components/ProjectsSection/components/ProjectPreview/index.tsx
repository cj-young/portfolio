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
  const previewContentRef = useRef<HTMLDivElement>(null);
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

    const onComplete = () => {
      navigate(`/projects/${project.id}`);
    };

    link.style.position = "fixed";
    link.style.inset = "0";
    link.style.zIndex = "1000";
    link.style.borderRadius = "0";

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
        className="relative block h-full w-full cursor-pointer rounded-md"
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
        <div ref={previewContentRef}>
          <span className="absolute bottom-4 right-4 text-2xl font-bold text-white">
            {project.name}
          </span>
        </div>
      </Link>
    </>
  );
}
