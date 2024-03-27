import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

type TConfig = {
  duration?: number;
  onAnimationFinished?(): void;
  clearProps?: string;
};
/**
 *
 * @param {Object} containerRef The container that is being scrolled
 * @param {Object} config The configuration object
 * @param {number} config.duration The duration of each animation
 * @param {string} config.clearProps The properties that are affected by animation and should be reset when finished
 */
export default function useFadeIn<T extends HTMLElement>(
  containerRef: React.RefObject<HTMLDivElement>,
  { duration = 0.5, onAnimationFinished, clearProps = "" }: TConfig = {},
) {
  const elementRef = useRef<T>(null);

  useGSAP(() => {
    if (!elementRef.current) return;

    gsap.from(elementRef.current, {
      scrollTrigger: {
        start: "top 75%",
        scrub: false,
        // markers: true,
        scroller: containerRef.current,
      },
      opacity: 0,
      translateY: "+=1rem",
      duration,
      onComplete: onAnimationFinished,
      clearProps,
    });
  });

  return { elementRef };
}
