import cssIcon from "@/src/assets/skill-icons/css3.svg";
import gitIcon from "@/src/assets/skill-icons/git-alt.svg";
import htmlIcon from "@/src/assets/skill-icons/html5.svg";
import jsIcon from "@/src/assets/skill-icons/js-logo.svg";
import nextIcon from "@/src/assets/skill-icons/nextjs.svg";
import reactIcon from "@/src/assets/skill-icons/react.svg";
import scssIcon from "@/src/assets/skill-icons/scss.svg";
import tailwindIcon from "@/src/assets/skill-icons/tailwind.svg";
import tsIcon from "@/src/assets/skill-icons/ts-logo.svg";
import { SkillItem } from "@/types/three";

const skillImages: {
  imageUrl: string;
  width: string | number;
  id: SkillItem;
}[] = [
  {
    imageUrl: htmlIcon,
    width: "60%",
    id: "html",
  },
  {
    imageUrl: cssIcon,
    width: "60%",
    id: "css",
  },
  {
    imageUrl: jsIcon,
    width: "50%",
    id: "js",
  },
  {
    imageUrl: tsIcon,
    width: "50%",
    id: "ts",
  },
  {
    imageUrl: reactIcon,
    width: "60%",
    id: "react",
  },
  {
    imageUrl: nextIcon,
    width: "50%",
    id: "next",
  },
  {
    imageUrl: scssIcon,
    width: "60%",
    id: "scss",
  },
  {
    imageUrl: tailwindIcon,
    width: "60%",
    id: "tailwind",
  },
  {
    imageUrl: gitIcon,
    width: "50%",
    id: "git",
  },
];

export default skillImages;
