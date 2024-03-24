import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type ScrollContextType = {
  scroller: React.RefObject<HTMLDivElement>;
  getScrollTop(): number;
  setScrolledSectionIndex: Dispatch<SetStateAction<number | null>>;
};

const ScrollContext = createContext<ScrollContextType>({} as ScrollContextType);

interface Props {
  children: ReactNode;
}

export default function ScrollContextProvider({ children }: Props) {
  const scroller = useRef<HTMLDivElement>(null);
  const [scrolledSectionIndex, setScrolledSectionIndex] = useState<
    number | null
  >(null);

  useLayoutEffect(() => {
    const scrollerEl = scroller.current;
    if (!scrollerEl || scrolledSectionIndex === null) return;

    scrollerEl.scrollTop = scrolledSectionIndex * scrollerEl.clientHeight;
    setScrolledSectionIndex(null);
  }, [scrolledSectionIndex]);

  function getScrollTop() {
    return scroller.current?.scrollTop ?? 0;
  }

  return (
    <ScrollContext.Provider
      value={{ scroller, getScrollTop, setScrolledSectionIndex }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollContext() {
  return useContext(ScrollContext);
}
