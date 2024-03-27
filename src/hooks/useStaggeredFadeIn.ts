import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

type TConfig = {
  autoApply?: boolean;
  duration?: number;
  attributeName?: string;
  onAnimationFinished?(): void;
  clearProps?: string;
};
/**
 *
 * @param {Object} containerRef The container that is being scrolled
 * @param {Object} config The configuration object
 * @param {boolean} config.autoApply If true, chilren of `parentRef` must be given the attribute `data-animate=false` to opt out of animation. If false, children must be given `data-animate=true` to opt in.
 * @param {number} config.duration The duration of each animation
 * @param {string} config.attributeName The name of the data attribute that controls whether an element should animate, defaults to `data-animate`
 */
export default function useStaggeredFadeIn<
  T extends HTMLElement,
  U extends HTMLElement = T,
>(
  containerRef: React.RefObject<HTMLDivElement>,
  {
    autoApply = true,
    duration = 0.5,
    attributeName = "data-animate",
    onAnimationFinished,
    clearProps = "",
  }: TConfig = {},
) {
  // The parent of the elements to animate in
  const parentRef = useRef<T>(null);
  // A ref of the element that is being scrolled
  const scrollTargetRef = useRef<U>(null);

  useGSAP(() => {
    if (!parentRef.current) return;
    const scrollTrigger = scrollTargetRef.current ?? parentRef.current;

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
        scroller: containerRef.current,
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
