import { HiOutlineExternalLink } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";

import Image from "next/image";
import agtvw610 from "../UI/img/agtvw610.png";

export function Projects() {
  return (
    <main className="m-auto max-w-full flex flex-col md:flex-row w-full md:w-full py-4 items-center space-x-24">
      <figure className="w-full">
        <Image
          className="rounded-lg w-full"
          src={agtvw610}
          alt="Arena Gaming Tv web site"
          priority={false} // {false} | {true}
        />
      </figure>
      <aside className="flex flex-col w-3/5 justify-center items-center order-0 md:order-1 text-center mx-auto">
        <h1 className="font-bold py-2">ArenaGamingTV</h1>
        <h4 className="">
          Collaborated with Arena Gaming TV website, developed features like
          countdown timer, news section, store system, live stream list,
          archives, and social media links. Focused on PHP framework-based web
          development for Esports industry. Created a robust user interface and
          integrated Twitch.tv transmission queue system using PHP, HTML, CSS3,
          and JavaScript. Resulted in 29% income growth and first-page Google
          ranking. Involved in analysis, planning, deployment, testing, and
          ongoing support.
        </h4>
        <h5 className="font-bold cursor-pointer py-2">PHP, HTML, CSS</h5>

        <div className="flex flex-row w-full items-center justify-center">
          <h5 className="font-bold py-2 flex justify-center items-center w-1/2 space-x-1">
            <span className="cursor-pointer">Code</span>
            <FaGithub className="cursor-pointer" />
          </h5>
          <h5 className="font-bold py-2 flex justify-center items-center w-1/2 text-sm space-x-1">
            <span className="cursor-pointer">Live Demo</span>
            <HiOutlineExternalLink className="cursor-pointer" />
          </h5>
        </div>
      </aside>
    </main>
  );
}
