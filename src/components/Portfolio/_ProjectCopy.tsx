import { HiOutlineExternalLink } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { StaticImageData } from "next/image";
// import Container from "@/app/container";

import Image from "next/image";

interface ProjectProps {
  imgSrc: StaticImageData;
  imgAlt: string;
  imgPriority?: boolean;
  title: string;
  details: string;
  techs: string;
  github: string;
  liveDemo: string;
  index: number;
}

export function Project({
  imgSrc,
  imgAlt,
  imgPriority = false,
  title,
  details,
  techs,
  github,
  liveDemo,
  index,
}: ProjectProps) {
  return (
    <section className="py-2 shadow-sm border-teal-500 border-2">
      <div className="container m-auto justify-center w-full border-red-600 border-2">
        <main className="flex flex-col md:flex-row max-w-full justify-center border-blue-500 border-2">
          <div
            style={{ flexDirection: index % 2 ? "row" : "row-reverse" }}
            className="container mx-auto max-w-full md:flex w-full md:w-8/12 px-4 py-12 border-yellow-500 border-2"
          >
            <figure className="flex flex-col w-full justify-center items-center p-6 order-0">
              <Image
                className="rounded-lg h-auto max-h-56 max-w-xs border-gray-500 border"
                src={imgSrc}
                alt={imgAlt}
                priority={imgPriority} // {false} | {true}
              />
              <div className="flex flex-row justify-center space-x-3 py-2 items-center font-medium">
                <a
                  href="https://github.com/FigueiredoFelipe/next-portfolio"
                  target="blank"
                >
                  {github?.length > 0 && (
                    <h5 className="flex flex-row cursor-pointer items-center indent-5 hover:text-blue-500 duration-700">
                      Code&nbsp;
                      <FaGithub className="" />
                    </h5>
                  )}
                </a>

                {github?.length > 0 && (
                  <span className="font-extralight cursor-default">|</span>
                )}
                <a href="https://felipefigueiredodev.vercel.app" target="blank">
                  {liveDemo?.length > 0 && (
                    <h5 className="flex flex-row cursor-pointer items-center hover:text-blue-500 duration-700">
                      Live demo&nbsp;
                      <HiOutlineExternalLink className="" />
                    </h5>
                  )}
                </a>
              </div>
            </figure>
            <article className="max-w-lg text-center order-1 p-6">
              <h1 className="text-blue-500 font-extrabold text-lg"></h1>
              <h4 className="font-extrabold text-2xl">{title}</h4>
              <p className="text-gray-500 py-3 text-center md:text-justify">
                {details}
              </p>
              <h5 className="font-bold cursor-pointer py-2">{techs}</h5>
            </article>
          </div>
        </main>
      </div>
    </section>
  );
}
