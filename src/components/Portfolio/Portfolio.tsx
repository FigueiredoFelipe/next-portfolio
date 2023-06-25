import { forwardRef } from "react";
import { Project } from "./Project";
import { StaticImageData } from "next/image";
import portfolio from "../../data/portfolio.json";

const Portfolio = forwardRef<HTMLElement>((_, ref) => {
  const agtvw610: StaticImageData = require("../UI/img/agtvw610.png");
  const advnegreiros: StaticImageData = require("../UI/img/advnegreiros.png");

  const resolveImgSrc: { [key: string]: StaticImageData } = {
    agtvw610: agtvw610,
    advnegreiros: advnegreiros,
  };
  return (
    <section className="font-Poppins text-gray-800 py-16 bg-gray-100" ref={ref}>
      <main className="container m-auto justify-center w-full">
        <h1 className="text-blue-500 font-extrabold text-lg m-auto w-full md:w-8/12 px-5">
          PORTFOLIO
        </h1>
        <h4 className="font-extrabold text-2xl w-full md:w-8/12 m-auto px-5 shadow-sm pb-6">
          Each project is a unique piece of development🧩
        </h4>
        {portfolio.map((item, index) => (
          <Project
            index={index}
            imgSrc={resolveImgSrc[item.imgSrc]}
            imgAlt={item.imgAlt}
            title={item.title}
            details={item.details}
            techs={item.techs}
            github={item.github}
            liveDemo={item.liveDemo}
          />
        ))}
      </main>
    </section>
  );
});

Portfolio.displayName = "Portfolio";

export default Portfolio;
