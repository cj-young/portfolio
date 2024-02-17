import useStaggeredFadeIn from "@/src/hooks/useStaggeredFadeIn";
import useMergedRef from "@react-hook/merged-ref";
import { CSSProperties, useState } from "react";
import skillImages, { SkillItem } from "./skill-images";

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
  ] as [string, string];
}

// const skillImages = Array.from({ length: 9 }, () => null);

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
  const [hoveredItem, setHoveredItem] = useState<SkillItem | null>(null);

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
          {skillImages.map((image) => (
            <SkillImage
              isMobile={false}
              imageUrl={image.imageUrl}
              imageWidth={image.width}
              key={image.id}
              isHovering={hoveredItem === image.id}
            />
          ))}
        </div>
        <div
          className="absolute left-1/2 top-1/2 mt-0 hidden -translate-x-1/2 -translate-y-1/2 grid-cols-3 gap-4 md:block"
          ref={largeParentRef}
          data-animate-grandparent="false"
        >
          {skillImages.map((image, i) => (
            <SkillImage
              isMobile={true}
              imageUrl={image.imageUrl}
              translation={getSkillNodeTranslations(i)}
              imageWidth={image.width}
              key={image.id}
              isHovering={hoveredItem === image.id}
              onMouseEnter={() => setHoveredItem(image.id)}
              onMouseLeave={() =>
                setHoveredItem((h) => (h === image.id ? null : h))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface SkillImageProps {
  imageUrl: string;
  imageWidth?: string | number;
  isMobile?: boolean;
  translation?: [string | number, string | number];
  isHovering?: boolean;
  onMouseEnter?(): any;
  onMouseLeave?(): any;
}

function SkillImage({
  imageUrl,
  isMobile = false,
  translation = [0, 0],
  imageWidth = "60%",
  onMouseEnter,
  onMouseLeave,
  isHovering,
}: SkillImageProps) {
  if (isHovering) {
    console.log("hovering");
  }

  return isMobile ? (
    <div
      className={
        "align-center absolute left-[var(--circle-translate-x)] top-[var(--circle-translate-y)] flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 justify-center rounded-[1000vmax] bg-white shadow-[0_0_16px_4px_rgba(0,0,0,15%)] transition-[scale]"
      }
      style={
        {
          "--circle-translate-x": translation[0],
          "--circle-translate-y": translation[1],
        } as CSSProperties
      }
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img
        src={imageUrl}
        className="block transition-[scale]"
        style={{
          width: imageWidth,
          scale: isHovering ? "110%" : "100%",
        }}
      />
    </div>
  ) : (
    <div
      className={
        "h-20 w-20 rounded-[1000vmax] bg-white shadow-[0_0_16px_4px_rgba(0,0,0,15%)]"
      }
      style={{
        translate: 0,
      }}
    >
      <img
        src={imageUrl}
        className="block transition-[scale]"
        style={{
          width: imageWidth,
          scale: isHovering ? 1.1 : 1,
        }}
      />
    </div>
  );
}
