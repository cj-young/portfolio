import ArrowIcon from "@/public/icons/arrow-down-solid.svg";

export default function HeroSection() {
  function goToAbout() {
    scrollTo({ top: window.innerHeight, behavior: "smooth" });
  }

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
      <div className="absolute bottom-20 mx-auto flex flex-col items-center justify-center md:bottom-8">
        <span className="text-xl font-bold text-purple">About Me</span>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-[1000vmax] bg-gray-400"
          onClick={goToAbout}
        >
          <img src={ArrowIcon} className="h-4 w-4 cursor-pointer" />
        </div>
      </div>
    </section>
  );
}
