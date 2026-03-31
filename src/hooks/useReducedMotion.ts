import { useState, useEffect } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  console.log(prefersReducedMotion);

  useEffect(() => {
    // Ensure window is defined (for SSR compatibility)
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia(QUERY);

    setPrefersReducedMotion(mediaQueryList.matches);

    // Define a listener for changes (using addEventListener)
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQueryList.addEventListener("change", listener);

    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return prefersReducedMotion;
}

export default useReducedMotion;
