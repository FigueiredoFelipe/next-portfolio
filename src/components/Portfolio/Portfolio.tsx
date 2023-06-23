import { forwardRef } from "react";
import { Projects } from "./Projects";

export const Portfolio = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section className="py-16 bg-gray-100" ref={ref}>
      <main className="container m-auto max-w-full w-full md:w-[1024px] flex flex-col px-4">
        <h1 className="text-blue-500 font-extrabold text-lg">PORTFOLIO</h1>
        <h4 className="font-extrabold text-2xl">
          Each project is a unique piece of development🧩
        </h4>
        <Projects />
        <Projects />
      </main>
    </section>
  );
});
