import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { useScrollContext } from "../pages/home/contexts/ScrollContext";

export default function useFadeIn() {
  const elementRef = useRef(null);
  const { scroller } = useScrollContext();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      elementRef.current,
      { opacity: 0, translateY: "1rem" },
      {
        opacity: 1,
        translateY: 0,
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 66%",
          scrub: false,
          scroller: scroller.current,
        },
      },
    );
  });

  return { elementRef };
}
