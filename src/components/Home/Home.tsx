import { forwardRef } from "react";

import { FaLinkedin, FaGithubSquare } from "react-icons/fa";

import { TechStack } from "./TechStack";
import Image from "next/image";
import profimg from "../UI/img/profimg.jpg";

const Home = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section className="font-Poppins bg-gray-100 dark:bg-[#363636]" ref={ref}>
      <div className="container mx-auto bg-gray-100 dark:bg-[#363636] justify-center w-full ">
        <div className="flex flex-col md:flex-row max-w-full justify-center items-center ">
          <div className="container mx-auto py-6 md:py-16 max-w-full flex flex-col md:flex-row w-full md:w-8/12 px-4">
            <div className="flex order-2 justify-center items-center ">
              <Image
                className="rounded-full border-gray-700 border-b-gray-500 border"
                src={profimg}
                alt="Felipe's picture"
              />
            </div>
            <div className="max-w-full order-2 md:order-1">
              <h1 className="text-4xl md:text-6xl font-bold max-w-2xl py-2 leading-none md:leading-[1.2] text-center md:text-start">
                Front-End React Developer
              </h1>
              <p className="max-w-lg text-sm md:text-base py-2 text-center md:text-justify">
                Hi, I&apos;m Felipe Figueiredo. A passionate Front-end React
                Developer based in Belo Horizonte, Brazil.
              </p>
              <div className="text-3xl flex space-x-2 pt-2 justify-center md:justify-start">
                <a
                  href="https://www.linkedin.com/in/fjnfigueiredo/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="hover:fill-blue-700 duration-700" />
                </a>
                <a
                  href="https://github.com/FigueiredoFelipe/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithubSquare className="hover:fill-blue-700 duration-700" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <TechStack />
      </div>
    </section>
  );
});

Home.displayName = "Home";

export default Home;
