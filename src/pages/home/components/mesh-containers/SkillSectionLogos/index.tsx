import LogoWrapper from "./logos/LogoWrapper";

const jsPositions: [number, number, number][] = [
  [-8, 0, -5],
  [-9, -4, -5],
  [-12, 3, -5],
  [-10, -2, -3],
  [8, 2, -5],
  [9, -4, -5],
  [12, 3, -5],
  [7, 0, -3],
  [13, -3, -7],
];

const tsPositions: [number, number, number][] = [
  [-9, 3, -6],
  [-10, -4, -3],
  [-10, -2, -5],
  [-14, 1, -6],
  [-6, -5, -5],
  [8, 0, -5],
  [8, -7, -7],
  [8, -3, -3],
  [10, 4, -5],
  [12, 0, -5],
];

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
