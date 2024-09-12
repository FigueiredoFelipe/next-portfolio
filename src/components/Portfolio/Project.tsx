import { HiOutlineExternalLink } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";
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
            <div className="flex flex-col md:flex-row gap-2 md:gap-12 h-auto md:h-[28rem] bg-white dark:bg-zinc-300 w-full p-8 shadow-custom rounded-2xl items-center py-10 pr-12">
              <figure className="w-full md:w-3/4 items-center justify-center">
                <Image
                  className="rounded-2xl shadow-custom h-auto overflow-hidden w-full md:w-[30rem]"
                  src={imgSrc}
                  alt={imgAlt}
                  priority={imgPriority} // {false} | {true}
                />
              </figure>

              <article className="flex flex-col h-auto justify-center text-center w-full md:w-[28rem] y-2 pr-6">
                <h3 className="font-bold"></h3>
                <h4 className="font-extrabold text-lg pt-4 md:pt-0 dark:text-[#202020]">
                  {title}
                </h4>
                <p className="text-grey-500 py-3 text-center md:text-left font-medium text-base">
                  {details}
                </p>
                <div>
                  <h5 className="font-bold cursor-pointer py-2 text-sm dark:text-[#202020]">
                    {techs}
                  </h5>
                </div>
                <div className="flex flex-row mx-auto text-base md:text-xl">
                  <a href={github} target="blank" className="group">
                    {github?.length > 0 && (
                      <h5 className="flex flex-row cursor-pointer items-center group-hover:text-blue-500 duration-700 border-r-gray-950 pr-4 dark:text-[#202020]">
                        Code&nbsp;
                        <FaGithub className="group-hover:fill-blue-500 duration-700" />
                      </h5>
                    )}
                  </a>

                  <a
                    href={liveDemo}
                    target="blank"
                    className="group hover:text-blue-500 duration-700"
                  >
                    {liveDemo?.length > 0 && (
                      <h5 className="flex flex-row cursor-pointer items-center group group-hover:text-blue-500 duration-700 border-l-gray-950 border-l pl-4 dark:text-[#202020]">
                        Live demo&nbsp;
                        <BiLinkExternal className="group-hover:fill-blue-500 duration-700 text-lg" />
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
