import { StaticImageData } from "next/image";
import { forwardRef } from "react";

import portData from "../../data/portData.json";
import { Project } from "./Project";

const Portfolio = forwardRef<HTMLElement>((_, ref) => {
  const agtvw610: StaticImageData = require("../UI/img/agtvw610.png");
  const advnegreiros: StaticImageData = require("../UI/img/advnegreiros.png");
  const felipedev: StaticImageData = require("../UI/img/felipedev.png");
  const todoapp: StaticImageData = require("../UI/img/todoapp.png");

  const resolveImgSrc: { [key: string]: StaticImageData } = {
    agtvw610: agtvw610,
    advnegreiros: advnegreiros,
    felipedev: felipedev,
    todoapp: todoapp,
  };
  return (
    <section className="py-16 bg-gray-100 dark:bg-[#363636]" ref={ref}>
      <main className="container m-auto justify-center w-full text-center md:text-start">
        <h1 className="text-blue-500 font-extrabold text-lg m-auto w-full md:w-8/12 px-5">
          PORTFOLIO
        </h1>
        <h4 className="font-extrabold text-2xl w-full md:w-8/12 m-auto px-5 pb-7">
          Each project is a unique piece of development🧩
        </h4>
        {portData.map((item, index) => (
          <Project
            key={item.id}
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
