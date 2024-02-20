import {
  cssPositions,
  gitPositions,
  htmlPositions,
  jsPositions,
  nextPositions,
  reactPositions,
  scssPositions,
  tailwindPositions,
  tsPositions,
} from "./logo-positions";
import LogoWrapper from "./logos/LogoWrapper";

export default function SkillSectionLogos() {
  return (
    <group>
      {jsPositions.map((position, i) => (
        <LogoWrapper position={position} skillId="js" key={`js${i}`} />
      ))}
      {tsPositions.map((position, i) => (
        <LogoWrapper position={position} skillId="ts" key={`ts${i}`} />
      ))}
      {htmlPositions.map((position, i) => (
        <LogoWrapper position={position} skillId="html" key={`ts${i}`} />
      ))}
      {cssPositions.map((position, i) => (
        <LogoWrapper position={position} skillId="css" key={`ts${i}`} />
      ))}
      {reactPositions.map((position, i) => (
        <LogoWrapper position={position} skillId="react" key={`ts${i}`} />
      ))}
      {nextPositions.map((position, i) => (
        <LogoWrapper position={position} skillId="next" key={`ts${i}`} />
      ))}
      {scssPositions.map((position, i) => (
        <LogoWrapper position={position} skillId="scss" key={`ts${i}`} />
      ))}
      {tailwindPositions.map((position, i) => (
        <LogoWrapper position={position} skillId="tailwind" key={`ts${i}`} />
      ))}
      {gitPositions.map((position, i) => (
        <LogoWrapper position={position} skillId="git" key={`ts${i}`} />
      ))}
    </group>
  );
}
