export default function HeroSection() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center">
      <div className="flex flex-col">
        <p className="text-purple text-xl font-semibold">Hey, I'm</p>
        <h1 className="text-title-sm md:text-title-lg text-purple mt-2 font-extrabold md:mt-0">
          CJ Young
        </h1>
        <p className="text-purple mt-3 text-xl font-semibold md:mt-[1.125rem] md:self-end">
          Front-end Developer
        </p>
      </div>
      <div className="absolute bottom-20 mx-auto flex flex-col items-center justify-center md:bottom-8">
        <span className="text-purple text-xl font-bold">About Me</span>
        <div className="h-8 w-8 rounded-[1000vmax] bg-gray-400"></div>
      </div>
    </section>
  );
}
