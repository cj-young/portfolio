import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";
import { useScrollContext } from "../../../contexts/ScrollContext";
import {
  cssPositions,
  gitPositions,
  htmlPositions,
  jestPositions,
  jsPositions,
  nextPositions,
  reactPositions,
  scssPositions,
  tailwindPositions,
  threePositions,
  tsPositions,
} from "./logo-positions";
import LogoWrapper from "./logos/LogoWrapper";

const PAGE_INDEX = 2;
const LOGOS_SCROLL_DAMPENING = 75;

export default function SkillSectionLogos() {
  const groupRef = useRef<Group>(null);
  const { getScrollTop } = useScrollContext();

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    const pixelsScrolledFromSection =
      PAGE_INDEX * window.innerHeight - getScrollTop();

    group.position.y = pixelsScrolledFromSection / -LOGOS_SCROLL_DAMPENING;
  });

  return (
    <group ref={groupRef}>
      {jsPositions.map((position, i) => (
        <LogoWrapper position={position} skillId="js" key={`js${i}`} />
      ))}
      {tsPositions.map((position, i) => (
        <LogoWrapper position={position} skillId="ts" key={`ts${i}`} />
      ))}
      {htmlPositions.map((position, i) => (
        <LogoWrapper position={position} skillId="html" key={`html${i}`} />
      ))}
      {cssPositions.map((position, i) => (
        <LogoWrapper position={position} skillId="css" key={`css${i}`} />
      ))}
      {reactPositions.map((position, i) => (
        <LogoWrapper position={position} skillId="react" key={`react${i}`} />
      ))}
      {nextPositions.map((position, i) => (
        <LogoWrapper position={position} skillId="next" key={`next${i}`} />
      ))}
      {scssPositions.map((position, i) => (
        <LogoWrapper position={position} skillId="scss" key={`scss${i}`} />
      ))}
      {tailwindPositions.map((position, i) => (
        <LogoWrapper
          position={position}
          skillId="tailwind"
          key={`tailwind${i}`}
        />
      ))}
      {gitPositions.map((position, i) => (
        <LogoWrapper position={position} skillId="git" key={`git${i}`} />
      ))}
      {jestPositions.map((position, i) => (
        <LogoWrapper position={position} skillId="jest" key={`jest${i}`} />
      ))}
      {threePositions.map((position, i) => (
        <LogoWrapper position={position} skillId="three" key={`three${i}`} />
      ))}
    </group>
  );
}
