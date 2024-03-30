import { SkillId } from "@/types/three";
import { skills } from "../../skill-images";

interface Props {
  hoveredItem: null | SkillId;
}

export default function DynamicSubtitle({ hoveredItem }: Props) {
  return (
    <div className="relative h-10 w-[15rem]">
      <h2
        className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-subtitle font-bold text-purple transition-opacity delay-100"
        style={{
          opacity: hoveredItem === null ? 1 : 0,
        }}
        aria-hidden={hoveredItem !== null}
      >
        My Skills
      </h2>
      {skills.map((skill) => (
        <span
          className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-subtitle font-bold transition-opacity delay-100"
          style={{
            opacity: hoveredItem === skill.id ? 1 : 0,
            color: skill.color,
          }}
          aria-hidden={hoveredItem !== skill.id}
          key={skill.id}
        >
          {skill.text}
        </span>
      ))}
    </div>
  );
}
