export default function HeroSection() {
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
        <div className="h-8 w-8 rounded-[1000vmax] bg-gray-400"></div>
      </div>
    </section>
  );
}
