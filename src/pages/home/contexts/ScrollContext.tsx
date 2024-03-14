import { ReactNode, createContext, useContext, useRef } from "react";

type ScrollContextType = {
  scroller: React.RefObject<HTMLDivElement>;
  getScrollTop(): number;
};

const ScrollContext = createContext<ScrollContextType>({} as ScrollContextType);

interface Props {
  children: ReactNode;
}

export default function ScrollContextProvider({ children }: Props) {
  const scroller = useRef<HTMLDivElement>(null);

  function getScrollTop() {
    return scroller.current?.scrollTop ?? 0;
  }

  return (
    <ScrollContext.Provider value={{ scroller, getScrollTop }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollContext() {
  return useContext(ScrollContext);
}
