import ArrowIcon from "@/src/assets/icons/arrow-down-solid.svg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useScrollContext } from "../../contexts/ScrollContext";

export default function HeroSection() {
  const toAboutButtonRef = useRef(null);
  const { scroller } = useScrollContext();

  function goToAbout() {
    if (!scroller.current) return;
    scroller.current.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  }

  useGSAP(() => {
    if (!toAboutButtonRef.current) return;
    const toAboutButton = toAboutButtonRef.current;
    gsap.to(toAboutButton, {
      opacity: 0,
      translateY: "-=1rem",
      scrollTrigger: {
        trigger: toAboutButton,
        start: "top 20%",
        scrub: false,
        toggleActions: "play none none reverse",
        scroller: scroller.current,
      },
    });
  });

  return (
    <section className="relative flex h-screen w-full items-center justify-center">
      <div className="flex flex-col">
        <p className="text-xl font-semibold text-purple">Hey, I'm</p>
        <h1 className="mt-2 text-title-sm font-extrabold text-purple md:mt-0 md:text-title-lg">
          CJ Young
        </h1>
        <p className="mt-3 text-xl font-semibold text-purple md:mt-[1.125rem] md:self-end">
          Front-end Developer
        </p>
      </div>
      <button
        className="absolute bottom-20 mx-auto flex cursor-pointer flex-col items-center justify-center md:bottom-8"
        onClick={goToAbout}
        ref={toAboutButtonRef}
      >
        <span className="text-xl font-bold text-purple">About Me</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-[1000vmax] bg-gray-400">
          <img src={ArrowIcon} className="h-4 w-4 " />
        </div>
      </button>
    </section>
  );
}
