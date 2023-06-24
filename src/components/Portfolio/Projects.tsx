import { HiOutlineExternalLink } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";

import Image from "next/image";
import agtvw610 from "../UI/img/agtvw610.png";

export function Projects() {
  return (
    <section className="py-2 shadow-sm">
      <div className="container m-auto justify-center w-full">
        <main className="flex flex-col md:flex-row max-w-full justify-center">
          <div className="container mx-auto max-w-full flex flex-col md:flex-row w-full md:w-8/12 px-4">
            <figure className="flex w-full justify-center items-center p-6 order-0">
              <Image
                className="rounded-lg h-auto max-h-56 max-w-sm border-gray-500 border"
                src={agtvw610}
                alt="Arena Gaming Tv web site"
                priority={false} // {false} | {true}
              />
            </figure>
            <article className="max-w-lg text-center order-1 ">
              <h1 className="text-blue-500 font-extrabold text-lg"></h1>
              <h4 className="font-extrabold text-2xl">ARENA GAMING TV</h4>
              <p className="text-gray-500 py-3">
                Collaborated with Arena Gaming TV website, developed features
                like countdown timer, news section, store system, live stream
                list, archives, and social media links. Focused on PHP
                framework-based web development for Esports industry. Created a
                robust user interface and integrated Twitch.tv transmission
                queue system using PHP, HTML, CSS3, and JavaScript. Resulted in
                29% income growth and first-page Google ranking. Involved in
                analysis, planning, deployment, testing, and ongoing support.
              </p>
              <h5 className="font-bold cursor-pointer py-2">PHP, HTML, CSS</h5>
              <div className="flex flex-row justify-center space-x-3">
                <h5 className="flex flex-row cursor-pointer items-center">
                  Code&nbsp;
                  <FaGithub className="" />
                </h5>
                <h5 className="flex flex-row cursor-pointer items-center">
                  Live demo&nbsp;
                  <HiOutlineExternalLink />
                </h5>
              </div>
            </article>
          </div>
        </main>
      </div>
    </section>
  );
}
