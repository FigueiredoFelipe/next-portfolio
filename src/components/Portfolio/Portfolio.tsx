import { forwardRef } from "react";
import { Projects } from "./Projects";

const Portfolio = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section className="py-16 bg-gray-100" ref={ref}>
      <main className="container flex flex-col m-auto w-full px-4 md:w-8/12">
        <h1 className="text-blue-500 font-extrabold text-lg m-auto w-full md:w-8/12">
          PORTFOLIO
        </h1>
        <h4 className="font-extrabold text-2xl w-full md:w-8/12 m-auto">
          Each project is a unique piece of development🧩
        </h4>
        <Projects />
        <Projects />
      </main>
    </section>
  );
});

Portfolio.displayName = "Portfolio";

export default Portfolio;
