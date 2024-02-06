import { useEffect, useRef } from "react";

export default function useMousePosition({
  minX = 0,
  maxX = 1,
  minY = 0,
  maxY = 1,
} = {}) {
  const mousePosition = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * (maxX - minX) + minX;
      const y = (e.clientY / window.innerHeight) * (maxY - minY) + minY;
      mousePosition.current.x = x;
      mousePosition.current.y = y;
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return mousePosition.current;
}
