import { ReactNode, createContext, useContext, useMemo } from "react";
import {
  HtmlPortalNode,
  InPortal,
  createHtmlPortalNode,
} from "react-reverse-portal";
import ProjectBackgroundCanvas from "../components/ProjectBackgroundCanvas";
import projectConfigs from "../config/projects";

type CanvasPortalContextType = {
  portalNodes: Map<string, HtmlPortalNode>;
};

const CanvasPortalContext = createContext<CanvasPortalContextType>(
  {} as CanvasPortalContextType,
);

type Props = {
  children: ReactNode;
};

export default function CanvasPortalsContextProvider({ children }: Props) {
  const portalNodes = useMemo(() => {
    const nodes = new Map<string, HtmlPortalNode>();
    for (let value of Object.values(projectConfigs)) {
      nodes.set(
        value.id,
        createHtmlPortalNode({
          attributes: {
            style: "width: 100%; height: 100%;",
          },
        }),
      );
    }
    return nodes;
  }, []);

  return (
    <CanvasPortalContext.Provider value={{ portalNodes }}>
      {children}
      {Object.entries(projectConfigs).map(([key, project]) => {
        const portalNode = portalNodes.get(project.id);
        if (!portalNode) return;

        return (
          <InPortal node={portalNode} key={key}>
            <ProjectBackgroundCanvas isPreview={false} project={project} />
          </InPortal>
        );
      })}
    </CanvasPortalContext.Provider>
  );
}

export function useCanvasPortals() {
  return useContext(CanvasPortalContext);
}
