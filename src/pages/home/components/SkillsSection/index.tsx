import useStaggeredFadeIn from "@/src/hooks/useStaggeredFadeIn";
import useMergedRef from "@react-hook/merged-ref";
import { CSSProperties } from "react";

const NUM_SKILL_NODES = 9;
const SKILL_NODE_OFFSET_ANGLE = 60;
const ANGLE_BETWEEN_SKILL_NODES =
  (360 - 2 * SKILL_NODE_OFFSET_ANGLE) / (NUM_SKILL_NODES - 1);

function getSkillNodeTranslations(cicrleIndex: number) {
  const angle =
    90 + SKILL_NODE_OFFSET_ANGLE + ANGLE_BETWEEN_SKILL_NODES * cicrleIndex;
  return [
    `calc(cos(${angle}deg) * 11rem)`,
    `calc(-1 * sin(${angle}deg) * 11rem)`,
  ];
}

const skillImages = Array.from({ length: 9 }, () => null);

export default function SkillsSection() {
  const { parentRef: mobileParentRef, scrollTargetRef: mobileScrollTargetRef } =
    useStaggeredFadeIn<HTMLDivElement>({
      duration: 0.5,
    });
  const { parentRef: largeParentRef, scrollTargetRef: largeScrollTargetRef } =
    useStaggeredFadeIn<HTMLDivElement>({
      duration: 0.5,
    });
  const { parentRef: grandparentRef } = useStaggeredFadeIn<HTMLDivElement>({
    attributeName: "data-animate-grandparent",
  });

  return (
    <section className="relative flex h-screen w-full items-center justify-center">
      <div
        className="flex flex-col items-center"
        ref={useMergedRef(
          grandparentRef,
          mobileScrollTargetRef,
          largeScrollTargetRef,
        )}
      >
        <h2 className="text-subtitle font-bold text-purple">My Skills</h2>
        <div
          className="mt-4 grid grid-cols-3 gap-4 md:hidden"
          ref={mobileParentRef}
          data-animate-grandparent="false"
        >
          {skillImages.map((_image, i) => (
            <div
              className={
                "h-20 w-20 rounded-[1000vmax] bg-white shadow-[0_0_16px_4px_rgba(0,0,0,15%)]"
              }
              key={i}
            ></div>
          ))}
        </div>
        <div
          className="absolute left-1/2 top-1/2 mt-0 hidden -translate-x-1/2 -translate-y-1/2 grid-cols-3 gap-4 md:block"
          ref={largeParentRef}
          data-animate-grandparent="false"
        >
          {skillImages.map((_image, i) => (
            <div
              className={
                "absolute left-[var(--circle-translate-x)] top-[var(--circle-translate-y)] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-[1000vmax] bg-white shadow-[0_0_16px_4px_rgba(0,0,0,15%)]"
              }
              key={i}
              style={
                {
                  "--circle-translate-x": getSkillNodeTranslations(i)[0],
                  "--circle-translate-y": getSkillNodeTranslations(i)[1],
                } as CSSProperties
              }
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
