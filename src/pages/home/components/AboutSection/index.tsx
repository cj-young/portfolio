import useStaggeredFadeIn from "@/src/hooks/useStaggeredFadeIn";
import { useScrollContext } from "../../contexts/ScrollContext";

export default function AboutSection() {
  const { scroller } = useScrollContext();
  const { parentRef } = useStaggeredFadeIn<HTMLDivElement>(scroller);

  return (
    <section className="relative flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center" ref={parentRef}>
        <h2 className="text-subtitle font-bold text-purple">About Me</h2>
        <p className="mt-4 max-w-[45ch] text-center text-base text-gray-400">
          I'm CJ Young, a front-end web developer based in Raleigh, North
          Carolina. I am in love with the process of building visually appealing
          web apps from start to finish. I don't know what else to write here.
        </p>
      </div>
    </section>
  );
}
