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
    <section className="">
      <div className="container">
        <main className="">
          <div
            style={{ flexDirection: index % 2 ? "row" : "row-reverse" }}
            className="container mx-auto max-w-full md:flex w-full md:w-8/12 px-4 pb-7"
          >
            <div className="flex flex-col md:flex-row gap-2 md:gap-12 h-auto md:h-[25rem] bg-white w-full p-8 shadow-custom rounded-2xl items-center py-10 pr-12">
              <figure className="w-full md:w-3/4 items-center justify-center">
                <Image
                  className="rounded-2xl shadow-custom h-auto overflow-hidden w-full md:w-[31rem]"
                  src={imgSrc}
                  alt={imgAlt}
                  priority={imgPriority} // {false} | {true}
                />
              </figure>

              <article className="flex flex-col h-auto justify-center text-center w-full md:w-[28rem] y-2 pr-6">
                <h3 className="font-bold">
                  <h4 className="font-extrabold text-lg">{title}</h4>
                </h3>
                <p className="text-gray-500 py-3 text-center md:text-justify font-medium text-base">
                  {details}
                </p>
                <div>
                  <h5 className="font-bold cursor-pointer py-2 text-sm">
                    {techs}
                  </h5>
                </div>
                <div className="flex flex-row justify-center gap-5 text-xl">
                  <a
                    href="https://github.com/FigueiredoFelipe/next-portfolio"
                    target="blank"
                  >
                    {github?.length > 0 && (
                      <h5 className="flex flex-row cursor-pointer items-center indent-5 hover:text-blue-500 duration-700">
                        Code&nbsp;
                        <FaGithub className="hover:fill-blue-500 duration-700" />
                      </h5>
                    )}
                  </a>

                  <a
                    href="https://felipefigueiredodev.vercel.app"
                    target="blank"
                  >
                    {liveDemo?.length > 0 && (
                      <h5 className="flex flex-row cursor-pointer items-center hover:text-blue-500 duration-700">
                        Live demo&nbsp;
                        <HiOutlineExternalLink className="" />
                      </h5>
                    )}
                  </a>
                </div>
              </article>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
