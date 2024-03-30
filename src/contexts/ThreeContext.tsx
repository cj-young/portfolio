import { SkillId } from "@/types/three";
import {
  MutableRefObject,
  ReactNode,
  createContext,
  useContext,
  useRef,
} from "react";

type ThreeContextType = {
  activeSkill: MutableRefObject<SkillObject>;
  setActiveSkill(skill: SkillId | null): void;
};

const ThreeContext = createContext<ThreeContextType>({} as ThreeContextType);

type Props = {
  children: ReactNode;
};

type SkillObject = {
  id: null | SkillId;
};

export default function ThreeContextProvider({ children }: Props) {
  const activeSkill = useRef<SkillObject>({ id: null });

  function setActiveSkill(skill: SkillId | null) {
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
