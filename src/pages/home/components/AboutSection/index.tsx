import useStaggeredFadeIn from "@/src/hooks/useStaggeredFadeIn";
import { useScrollContext } from "../../contexts/ScrollContext";

export default function AboutSection() {
  const { scroller } = useScrollContext();
  const { parentRef } = useStaggeredFadeIn<HTMLDivElement>(scroller);

  return (
    <section className="relative flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center" ref={parentRef}>
        <h2 className="text-subtitle font-bold text-purple">About Me</h2>
        <p className="mt-4 max-w-[50ch] text-balance text-center text-base text-gray-400">
          I'm CJ Young, a front-end web developer based in Raleigh, North
          Carolina. I first started coding on a TI-84 calculator and fell in
          love with the process of creating programs. Since then, I've made it a
          priority to constantly learn new things about software development and
          have continually strived to improve my skills. Now, I enjoy making web
          apps that are visually appealing, accessible, and user-friendly.
        </p>
      </div>
    </section>
  );
}
