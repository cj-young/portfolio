export default function ProjectsSection() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center">
      <h2 className="text-purple text-subtitle font-bold">Projects</h2>
      <div className="mt-4 flex w-full flex-col items-center gap-4 md:grid md:max-w-[45rem] md:grid-cols-[15rem_1fr] md:grid-rows-[12.5rem_12.5rem] md:gap-6">
        <div className="row-span-2 aspect-square w-full max-w-[15rem] rounded-[1rem] bg-gray-200 md:aspect-auto md:h-full md:max-w-none"></div>
        <div className="aspect-square w-full max-w-[15rem] rounded-[1rem] bg-gray-200 md:aspect-auto md:h-full md:max-w-none"></div>
        <div className="aspect-square w-full max-w-[15rem] rounded-[1rem] bg-gray-200 md:aspect-auto md:h-full md:max-w-none"></div>
      </div>
    </section>
  );
}
