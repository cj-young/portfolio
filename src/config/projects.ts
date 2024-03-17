import Pawn from "@/src/components/mesh-containers/Pawn";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { ColorRepresentation, Group } from "three";

export type ProjectModelProps = {
  color?: ColorRepresentation;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
} & Omit<JSX.IntrinsicElements["group"], "position" | "rotation" | "scale">;

export type ProjectModel =
  | {
      isInPreview: true;
      component: ForwardRefExoticComponent<RefAttributes<Group>>;
      previewProps: ProjectModelProps;
      props: ProjectModelProps;
    }
  | {
      isInPreview: false;
    };

export type Project = {
  name: string;
  id: string;
  backgroundColor: string;
  models: ProjectModel[];
};

const projectConfigs = {
  chessApp: {
    name: "Com.chess",
    id: "com-chess",
    backgroundColor: "#4e1889",
    models: [
      {
        isInPreview: true,
        component: Pawn,
        previewProps: {
          position: [1, 0, 0],
          rotation: [-0.1, Math.PI, 0.25],
          color: "#4e1889",
        },
        props: {
          position: [2.5, 0, 0],
          scale: [0.9, 0.9, 0.9],
          color: "#4e1889",
        },
      },
    ],
  },
  whischat: {
    name: "Whischat",
    id: "whischat",
    backgroundColor: "#008533",
    models: [],
  },
  devforge: {
    name: "DevForge",
    id: "dev-forge",
    backgroundColor: "#cb2835",
    models: [],
  },
} as const satisfies Record<string, Project>;

export default projectConfigs;
