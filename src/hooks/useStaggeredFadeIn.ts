import { useGSAP } from "@gsap/react";
import gsap, { CSSPlugin } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { useScrollContext } from "../pages/home/contexts/ScrollContext";

type TConfig = {
  autoApply?: boolean;
  duration?: number;
  attributeName?: string;
  onAnimationFinished?(): void;
  clearProps?: string;
};
/**
 *
 * @param {Object} config The configuration object
 * @param {boolean} config.autoApply If true, chilren of `parentRef` must be given the attribute `data-animate=false` to opt out of animation. If false, children must be given `data-animate=true` to opt in.
 * @param {number} config.duration The duration of each animation
 * @param {string} config.attributeName The name of the data attribute that controls whether an element should animate, defaults to `data-animate`
 */
export default function useStaggeredFadeIn<
  T extends HTMLElement,
  U extends HTMLElement = T,
>({
  autoApply = true,
  duration = 0.5,
  attributeName = "data-animate",
  onAnimationFinished,
  clearProps = "",
}: TConfig = {}) {
  const parentRef = useRef<T>(null);
  const scrollTargetRef = useRef<U>(null);
  const { scroller } = useScrollContext();

  useGSAP(() => {
    if (!parentRef.current) return;
    const scrollTrigger = scrollTargetRef.current ?? parentRef.current;
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(CSSPlugin);

    const childrenToApplyAnimation = [];
    for (const child of parentRef.current.children) {
      const shouldApply = child.getAttribute(attributeName) ?? autoApply;
      if (shouldApply && shouldApply !== "false") {
        childrenToApplyAnimation.push(child);
      }
    }
    gsap.from(childrenToApplyAnimation, {
      scrollTrigger: {
        trigger: scrollTrigger,
        start: "top 75%",
        scrub: false,
        // markers: true,
        scroller: scroller.current,
      },
      opacity: 0,
      translateY: "+=1rem",
      stagger: 0.25 * duration,
      duration,
      onComplete: onAnimationFinished,
      clearProps,
    });
  });

  return { parentRef, scrollTargetRef };
}
