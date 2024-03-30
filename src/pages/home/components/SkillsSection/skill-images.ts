import cssIcon from "@/src/assets/skill-icons/css3.svg";
import gitIcon from "@/src/assets/skill-icons/git-alt.svg";
import htmlIcon from "@/src/assets/skill-icons/html5.svg";
import jsIcon from "@/src/assets/skill-icons/js-logo.svg";
import nextIcon from "@/src/assets/skill-icons/nextjs.svg";
import reactIcon from "@/src/assets/skill-icons/react.svg";
import scssIcon from "@/src/assets/skill-icons/scss.svg";
import tailwindIcon from "@/src/assets/skill-icons/tailwind.svg";
import tsIcon from "@/src/assets/skill-icons/ts-logo.svg";
import { SkillId } from "@/types/three";

export const skills: {
  imageUrl: string;
  imageWidth: string | number;
  id: SkillId;
  color: string;
  text: string;
}[] = [
  {
    imageUrl: htmlIcon,
    imageWidth: "60%",
    id: "html",
    color: "#e44d26",
    text: "HTML",
  },
  {
    imageUrl: cssIcon,
    imageWidth: "60%",
    id: "css",
    color: "#264de4",
    text: "CSS",
  },
  {
    imageUrl: jsIcon,
    imageWidth: "50%",
    id: "js",
    color: "#d6be02",
    text: "JavaScript",
  },
  {
    imageUrl: tsIcon,
    imageWidth: "50%",
    id: "ts",
    color: "#3178c6",
    text: "TypeScript",
  },
  {
    imageUrl: reactIcon,
    imageWidth: "60%",
    id: "react",
    color: "#00a8c7",
    text: "React",
  },
  {
    imageUrl: nextIcon,
    imageWidth: "50%",
    id: "next",
    color: "#000000",
    text: "Next.js",
  },
  {
    imageUrl: scssIcon,
    imageWidth: "60%",
    id: "scss",
    color: "#cd6799",
    text: "SCSS/SASS",
  },
  {
    imageUrl: tailwindIcon,
    imageWidth: "60%",
    id: "tailwind",
    color: "#38bdf8",
    text: "Tailwind",
  },
  {
    imageUrl: gitIcon,
    imageWidth: "50%",
    id: "git",
    color: "#f05033",
    text: "Git",
  },
];
