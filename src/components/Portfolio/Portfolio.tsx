import { forwardRef } from "react";
import { Projects } from "./Projects";
import { Projects2 } from "./Projects2";

const Portfolio = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section className="font-Poppins text-gray-800 py-16 bg-gray-100" ref={ref}>
      <main className="container m-auto justify-center w-full">
        <h1 className="text-blue-500 font-extrabold text-lg m-auto w-full md:w-8/12 px-5">
          PORTFOLIO
        </h1>
        <h4 className="font-extrabold text-2xl w-full md:w-8/12 m-auto px-5 ">
          Each project is a unique piece of development🧩
        </h4>
        <Projects />
        <Projects2 />
      </main>
    </section>
  );
});

Portfolio.displayName = "Portfolio";

export default Portfolio;
