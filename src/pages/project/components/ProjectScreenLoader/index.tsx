import { Project } from "@/src/config/projects";
import { clamp } from "@/src/lib/utils";
import { useProgress } from "@react-three/drei";
import { useEffect, useLayoutEffect, useState } from "react";

interface Props {
  project: Project;
}

export default function ProjectScreenLoader({ project }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { progress } = useProgress();
  const clampedProgress = clamp(progress, 0, 100);

  useEffect(() => {
    if (!isLoaded && progress >= 100) {
      setTimeout(() => {
        setIsLoaded(true);
      }, 300);
    }
  }, [progress]);

  useLayoutEffect(() => {
    if (!isLoaded) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [isLoaded]);

  return (
    <div
      className="fixed inset-0 z-50 bg-gradient-to-b transition-opacity delay-300 duration-[1000ms]"
      style={{
        opacity: clampedProgress < 100 ? "100%" : "0%",
        pointerEvents: isLoaded ? "none" : "unset",
        backgroundColor: project.backgroundColor,
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 h-2 w-[8rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-sm transition-opacity duration-300"
        style={{
          opacity: clampedProgress < 100 ? "100%" : "0%",
        }}
      >
        <div
          className="absolute inset-0 rounded-sm"
          style={{
            opacity: 0.333,
            backgroundColor: project.secondaryColor,
          }}
        ></div>
        <div
          className="absolute bottom-0 left-0 top-0 w-full origin-left rounded-sm transition-[scale]"
          style={{
            scale: `${clampedProgress}% 100%`,
            backgroundColor: project.secondaryColor,
          }}
        ></div>
      </div>
    </div>
  );
}
