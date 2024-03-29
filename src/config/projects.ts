import Pawn from "@/src/components/mesh-containers/Pawn";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { ColorRepresentation, Group } from "three";
import BracketsFull from "../components/mesh-containers/BracketsFull";
import ChatBubble from "../components/mesh-containers/ChatBubble";

import chessAnalyzeImage from "@/src/assets/screenshots/chess-analyze.png";
import chessGameImage from "@/src/assets/screenshots/chess-game-2.png";
import chessHomeImage from "@/src/assets/screenshots/chess-home.png";
import chessPreviewImage from "@/src/assets/screenshots/chess-preview.png";
const chessDemoIdentifier = "demo@demo.com";
const chessDemoPassword = "ft3$msA9e";
const chessDemoParams = new URLSearchParams();
chessDemoParams.set("demoIdentifier", chessDemoIdentifier);
chessDemoParams.set("demoPassword", chessDemoPassword);
// Demo 1 credentials (public):
//demo@demo.com
//Demo1
//ft3$msA9e
// Demo 2 credentials (public):
//demo2@demo.com
//Demo2
//5!bFgPqR

import editorEditableImage from "@/src/assets/screenshots/editor-editable.png";
import editorGalaxyImage from "@/src/assets/screenshots/editor-galaxy.png";
import editorHomeImage from "@/src/assets/screenshots/editor-home.png";
import editorPreviewImage from "@/src/assets/screenshots/editor-preview.png";
import editorShareImage from "@/src/assets/screenshots/editor-share-modal.png";

import chatDmImage from "@/src/assets/screenshots/chat-dm-2.png";
import chatHomeImage from "@/src/assets/screenshots/chat-home.png";
import chatPreviewImage from "@/src/assets/screenshots/chat-preview.png";
import chatServerImage from "@/src/assets/screenshots/chat-server.png";
import { CopywriteItem, copywriting } from "./copywrighting";
import { TechTag, techTagPresets } from "./techTagPresets";

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
  secondaryColor: string;
  titleColor: string;
  textColor: string;
  models: ProjectModel[];
  images: string[];
  previewImage: string;
  previewImageInset: string;
  techTags: TechTag[];
  copywriting: CopywriteItem;
  links?: {
    code?: string;
    live?: string;
  };
};

const projectConfigs = {
  chessApp: {
    name: "Com.chess",
    id: "com-chess",
    backgroundColor: "#4e1889",
    secondaryColor: "#8832e6",
    titleColor: "#ede1fa",
    textColor: "#d2bee8",
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
    images: [chessGameImage, chessAnalyzeImage, chessHomeImage],
    previewImage: chessPreviewImage,
    previewImageInset: "5rem auto auto -6rem",
    techTags: [
      techTagPresets.react,
      techTagPresets.typeScript,
      techTagPresets.scss,
      techTagPresets.express,
      techTagPresets.mongoDb,
      techTagPresets.socketIo,
    ],
    copywriting: copywriting.chessApp,
    links: {
      code: "https://github.com/cj-young/com-chess",
      live: `https://com-chess.vercel.app/login?${chessDemoParams.toString()}`,
    },
  },
  whischat: {
    name: "Whischat",
    id: "whischat",
    backgroundColor: "#008533",
    secondaryColor: "#004219",
    titleColor: "#e9f5ed",
    textColor: "#c5edd4",
    models: [
      {
        isInPreview: true,
        component: ChatBubble,
        previewProps: {
          position: [3, 0, 0],
          rotation: [0, -1.4, 0.1],
          scale: [1.5, 1.5, 1.5],
          color: "#008533",
        },
        props: {
          position: [2.5, 0, 0],
          scale: [2, 2, 2],
          color: "#008533",
        },
      },
    ],
    images: [chatServerImage, chatDmImage, chatHomeImage],
    previewImage: chatPreviewImage,
    previewImageInset: "-2rem auto auto 1rem",
    techTags: [
      techTagPresets.next,
      techTagPresets.react,
      techTagPresets.scss,
      techTagPresets.typeScript,
      techTagPresets.mongoDb,
      techTagPresets.webRtc,
      techTagPresets.firebase,
    ],
    copywriting: copywriting.chatApp,
    links: {
      code: "https://github.com/cj-young/chat-app",
      live: "https://chat-app-peach-gamma.vercel.app/",
    },
  },
  devforge: {
    name: "DevForge",
    id: "dev-forge",
    backgroundColor: "#cb2835",
    secondaryColor: "#660911",
    titleColor: "#f5e9e9",
    textColor: "#f0d5d5",
    models: [
      {
        isInPreview: true,
        component: BracketsFull,
        previewProps: {
          position: [-4, -0.5, 0],
          rotation: [Math.PI / 2, 0.2, -0.5],
          scale: [0.5, 0.5, 0.5],
          color: "#cb2835",
        },
        props: {
          position: [4.3, 0, 0],
          rotation: [Math.PI / 2, 0.1, 0.5],
          scale: [0.6, 0.6, 0.6],
          color: "#cb2835",
        },
      },
    ],
    images: [
      editorEditableImage,
      editorGalaxyImage,
      editorHomeImage,
      editorShareImage,
    ],
    previewImage: editorPreviewImage,
    previewImageInset: "-2rem -3rem auto auto",
    techTags: [
      techTagPresets.angular,
      techTagPresets.typeScript,
      techTagPresets.firebase,
      techTagPresets.tailwind,
    ],
    copywriting: copywriting.codeEditor,
    links: {
      code: "https://github.com/cj-young/code-editor",
      live: "https://dev-forge-nine.vercel.app/",
    },
  },
} as const satisfies Record<string, Project>;

export default projectConfigs;
