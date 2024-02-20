import { SkillItem } from "@/types/three";

interface Props {
  hoveredItem: null | SkillItem;
}

const skillTitles: {
  skillId: SkillItem;
  color: string;
  text: string;
}[] = [
  {
    skillId: "html",
    color: "#e44d26",
    text: "HTML",
  },
  {
    skillId: "css",
    color: "#264de4",
    text: "CSS",
  },
  {
    skillId: "js",
    color: "#d6be02",
    text: "JavaScript",
  },
  {
    skillId: "ts",
    color: "#3178c6",
    text: "TypeScript",
  },
  {
    skillId: "react",
    color: "#00a8c7",
    text: "React",
  },
  {
    skillId: "next",
    color: "#000000",
    text: "Next.js",
  },
  {
    skillId: "scss",
    color: "#cd6799",
    text: "SCSS/SASS",
  },
  {
    skillId: "tailwind",
    color: "#38bdf8",
    text: "Tailwind",
  },
  {
    skillId: "git",
    color: "#f05033",
    text: "Git",
  },
];

export default function DynamicSubtitle({ hoveredItem }: Props) {
  return (
    <div className="relative h-10 w-[15rem]">
      <h2
        className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-subtitle font-bold text-purple transition-opacity delay-200"
        style={{
          opacity: hoveredItem === null ? 1 : 0,
        }}
        aria-hidden={hoveredItem !== null}
      >
        My Skills
      </h2>
      {skillTitles.map((title) => (
        <span
          className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-subtitle font-bold transition-opacity delay-200"
          style={{
            opacity: hoveredItem === title.skillId ? 1 : 0,
            color: title.color,
          }}
          aria-hidden={hoveredItem !== title.skillId}
          key={title.skillId}
        >
          {title.text}
        </span>
      ))}
    </div>
  );
}
