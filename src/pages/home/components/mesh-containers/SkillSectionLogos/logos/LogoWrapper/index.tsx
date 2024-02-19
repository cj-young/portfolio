import { useThreeContext } from "@/src/contexts/ThreeContext";
import { SkillItem } from "@/types/three";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Group } from "three";
import CssLogo from "../Css";
import HtmlLogo from "../Html";
import JavaScriptLogo from "../JavaScript";
import ReactLogo from "../React";
import TypeScriptLogo from "../TypeScript";

type Props = {
  position: [number, number, number];
  skillId: SkillItem;
};

const MAX_X_ROTATION = Math.PI / 8;
const MAX_Y_ROTATION = Math.PI / 8;
const MAX_Z_ROTATION = Math.PI / 8;
const MAX_ROTATION_SPEED = 0.5;
const MIN_ROTATION_SPEED = 0.05;

export default function LogoWrapper({ position, skillId }: Props) {
  const innerRef = useRef<Group>(null);
  const { activeSkill } = useThreeContext();
  const { camera } = useThree();
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
    const group = innerRef.current;
    if (!group) return;
    group.lookAt(camera.position);
    const { x, y, z } = group.rotation;
    startingRotation.current = { x, y, z };
  }, []);

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
  ) : null;
}
