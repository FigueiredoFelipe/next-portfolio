import { HiOutlineExternalLink } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";

import Image from "next/image";
import advnegreiros from "../UI/img/advnegreiros.png";

export function Projects2() {
  return (
    <section className="py-2 shadow-sm">
      <div className="container m-auto justify-center w-full">
        <main className="flex flex-col md:flex-row max-w-full justify-center">
          <div className="container mx-auto max-w-full flex flex-col md:flex-row w-full md:w-8/12 px-4">
            <figure className="flex w-full justify-center items-center p-6 order-0 md:order-2">
              <Image
                className="rounded-lg h-auto max-h-56 max-w-sm border-gray-500 border"
                src={advnegreiros}
                alt="Arena Gaming Tv web site"
                priority={false} // {false} | {true}
              />
            </figure>
            <article className="max-w-lg text-center order-1">
              <h1 className="text-blue-500 font-extrabold text-lg"></h1>
              <h4 className="font-extrabold text-2xl">ADVOCACIA NEGREIROS</h4>
              <p className="text-gray-500 py-3">
                Developed a WordPress website with a fully integrated news
                system. The website is designed to be responsive, ensuring
                optimal viewing and user experience across various devices.
                Additionally, I have customized the CSS and JavaScript to
                enhance the visual appeal and functionality of the website. By
                leveraging my expertise in WordPress development, I have created
                a dynamic and engaging platform for sharing news and
                information. The result is a professionally designed website
                that seamlessly combines aesthetics with functionality,
                providing an exceptional user experience for visitors.
              </p>
              <h5 className="font-bold cursor-pointer py-2">
                WORDPRESS, JAVASCRIPT
              </h5>
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
