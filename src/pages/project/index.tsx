import { Project } from "@/src/config/projects";
import { useCanvasPortals } from "@/src/contexts/CanvasPortalsContext";
import { OutPortal } from "react-reverse-portal";

interface Props {
  project: Project;
}

export default function ProjectPage({ project }: Props) {
  const { portalNodes } = useCanvasPortals();

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

      <div className="fixed inset-0">index</div>
    </>
  );
}
