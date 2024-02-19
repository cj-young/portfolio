import { jsPositions, tsPositions } from "./logo-positions";
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
    </group>
  );
}
