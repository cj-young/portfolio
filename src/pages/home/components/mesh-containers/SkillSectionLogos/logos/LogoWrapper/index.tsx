import { useThreeContext } from "@/src/contexts/ThreeContext";
import { useScrollContext } from "@/src/pages/home/contexts/ScrollContext";
import { SkillId } from "@/types/three";
import { useProgress } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Group, Vector3 } from "three";
import CssLogo from "../Css";
import GitLogo from "../Git";
import HtmlLogo from "../Html";
import JavaScriptLogo from "../JavaScript";
import JestLogo from "../Jest";
import NextLogo from "../Next";
import ReactLogo from "../React";
import ScssLogo from "../Scss";
import TailwindLogo from "../Tailwind";
import ThreeLogo from "../Three";
import TypeScriptLogo from "../TypeScript";

type Props = {
  position: [number, number, number];
  skillId: SkillId;
};

const MAX_X_ROTATION = Math.PI / 8;
const MAX_Y_ROTATION = Math.PI / 8;
const MAX_Z_ROTATION = Math.PI / 8;
const MAX_ROTATION_SPEED = 0.5;
const MIN_ROTATION_SPEED = 0.05;

const PAGE_INDEX = 2;

// Fraction of section height where if the middle of the
// viewport is inside, 3d objects are visible
const SCROLL_WINDOW = 1;

export default function LogoWrapper({ position, skillId }: Props) {
  const innerRef = useRef<Group>(null);
  const { activeSkill } = useThreeContext();
  const { camera } = useThree();
  const { progress } = useProgress();
  const { getScrollTop } = useScrollContext();
  const rotationSpeed = useRef({
    x:
      Math.random() * (MAX_ROTATION_SPEED - MIN_ROTATION_SPEED) +
      MIN_ROTATION_SPEED,
    y:
      Math.random() * (MAX_ROTATION_SPEED - MIN_ROTATION_SPEED) +
      MIN_ROTATION_SPEED,
    z:
      Math.random() * (MAX_ROTATION_SPEED - MIN_ROTATION_SPEED) +
      MIN_ROTATION_SPEED,
  });
  const startingRotation = useRef({
    x: 0,
    y: 0,
    z: 0,
  });
  const rotationTimeOffset = useRef({
    x: Math.random() * 30,
    y: Math.random() * 30,
    z: Math.random() * 30,
  });

  useFrame(({ clock }) => {
    const group = innerRef.current;
    if (!group) return;

    const sectionTooLow =
      getScrollTop() + window.innerHeight / 2 <
      PAGE_INDEX * window.innerHeight -
        (window.innerHeight - window.innerHeight * SCROLL_WINDOW) / 2;

    const sectionTooHigh =
      getScrollTop() + window.innerHeight / 2 >
      (PAGE_INDEX + 1) * window.innerHeight +
        (window.innerHeight - window.innerHeight * SCROLL_WINDOW) / 2;

    if (sectionTooHigh || sectionTooLow) {
      gsap.to(group.scale, {
        x: 0,
        y: 0,
        z: 0,
      });
      return;
    }

    if (activeSkill.current.id === skillId) {
      gsap.to(group.scale, {
        x: 1,
        y: 1,
        z: 1,
      });
    } else {
      gsap.to(group.scale, {
        x: 0,
        y: 0,
        z: 0,
      });
    }
    const xRotation =
      Math.sin(
        clock.elapsedTime * rotationSpeed.current.x +
          rotationTimeOffset.current.x,
      ) *
        MAX_X_ROTATION +
      startingRotation.current.x;
    const yRotation =
      Math.sin(
        clock.elapsedTime * rotationSpeed.current.y +
          rotationTimeOffset.current.y,
      ) *
        MAX_Y_ROTATION +
      startingRotation.current.y;
    const zRotation =
      Math.sin(
        clock.elapsedTime * rotationSpeed.current.z +
          rotationTimeOffset.current.z,
      ) *
        MAX_Z_ROTATION +
      startingRotation.current.z;
    group.rotation.x = xRotation;
    group.rotation.y = yRotation;
    group.rotation.z = zRotation;
  });

  useEffect(() => {
    if (progress < 100) return;
    const group = innerRef.current;
    if (!group) return;
    group.lookAt(new Vector3(camera.position.x, group.position.y, camera.position.z));
    const { x, y, z } = group.rotation;
    startingRotation.current = { x, y, z };
  }, [progress]);

  return skillId === "js" ? (
    <JavaScriptLogo position={position} innerRef={innerRef} />
  ) : skillId === "ts" ? (
    <TypeScriptLogo position={position} innerRef={innerRef} />
  ) : skillId === "html" ? (
    <HtmlLogo position={position} innerRef={innerRef} />
  ) : skillId === "css" ? (
    <CssLogo position={position} innerRef={innerRef} />
  ) : skillId === "react" ? (
    <ReactLogo position={position} innerRef={innerRef} />
  ) : skillId === "next" ? (
    <NextLogo position={position} innerRef={innerRef} />
  ) : skillId === "scss" ? (
    <ScssLogo position={position} innerRef={innerRef} />
  ) : skillId === "tailwind" ? (
    <TailwindLogo position={position} innerRef={innerRef} />
  ) : skillId === "git" ? (
    <GitLogo position={position} innerRef={innerRef} />
  ) : skillId === "jest" ? (
    <JestLogo position={position} innerRef={innerRef} />
  ) : skillId === "three" ? (
    <ThreeLogo position={position} innerRef={innerRef} />
  ) : null;
}
