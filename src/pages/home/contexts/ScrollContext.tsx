import {
  ReactNode,
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import { useLocation } from "react-router-dom";

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
  const { state } = useLocation();

  useLayoutEffect(() => {
    const scrollerEl = scroller.current;
    if (!scrollerEl || !state) return;

    const { scrolledSectionIndex } = state;
    if (scrolledSectionIndex !== undefined) {
      scrollerEl.scrollTop = scrolledSectionIndex * scrollerEl.clientHeight;
    }
  }, []);

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
