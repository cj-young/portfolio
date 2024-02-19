import { SkillItem } from "@/types/three";
import {
  MutableRefObject,
  ReactNode,
  createContext,
  useContext,
  useRef,
} from "react";

type ThreeContextType = {
  activeSkill: MutableRefObject<SkillObject>;
  setActiveSkill(skill: SkillItem | null): void;
};

const ThreeContext = createContext<ThreeContextType>({} as ThreeContextType);

type Props = {
  children: ReactNode;
};

type SkillObject = {
  id: null | SkillItem;
};

export default function ThreeContextProvider({ children }: Props) {
  const activeSkill = useRef<SkillObject>({ id: null });

  function setActiveSkill(skill: SkillItem | null) {
    activeSkill.current.id = skill;
  }

  return (
    <ThreeContext.Provider value={{ activeSkill, setActiveSkill }}>
      {children}
    </ThreeContext.Provider>
  );
}

export function useThreeContext() {
  return useContext(ThreeContext);
}
