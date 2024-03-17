import { Project } from "@/src/config/projects";
import { Canvas } from "@react-three/fiber";
import { Group, Object3DEventMap } from "three";
import CanvasAutoSizer from "../CanvasAutoSizer";

interface Props {
  project: Project;
  isPreview: boolean;
  modelsRef?: React.MutableRefObject<(Group<Object3DEventMap> | null)[]>;
}

export default function ProjectBackgroundCanvas({
  project,
  isPreview,
  modelsRef,
}: Props) {
  return (
    <>
      <Canvas flat camera={{ fov: 45 }}>
        <CanvasAutoSizer>
          {project.models.map((model, i) => {
            if (!model.isInPreview) return;
            const Component = model.component;
            const modelProps = isPreview ? model.previewProps : model.props;
            return (
              <Component
                {...modelProps}
                key={i}
                ref={(el) => {
                  if (modelsRef?.current) {
                    modelsRef.current[i] = el;
                  }
                }}
              />
            );
          })}
          <ambientLight intensity={1} />
          <directionalLight intensity={1.5} position={[-1, 1, 2]} />
        </CanvasAutoSizer>
      </Canvas>
    </>
  );
}
