import Image from "next/image";
import { forwardRef } from "react";

import ho1Image from "../UI/img/ho1-2-410px.png";

const AboutMe = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section className="py-16" ref={ref}>
      <div className="container m-auto justify-center w-full">
        <main className="flex flex-col md:flex-row max-w-full justify-center">
          <div className="container mx-auto max-w-full flex flex-col md:flex-row w-full md:w-8/12 px-4">
            <figure className="flex w-full justify-center items-center md:order-2 px-6 pb-4">
              <Image
                className="rounded-lg h-auto max-h-56"
                src={ho1Image}
                alt="home office desk"
                priority={false} // {false} | {true}
              />
            </figure>
            <article className="max-w-lg md:order-1 text-center md:text-start">
              <h1 className="text-blue-500 font-extrabold text-lg">ABOUT ME</h1>
              <h4 className="font-extrabold text-2xl">
                A dedicated Full-Stack Developer based in Belo Horizonte,
                Brazil.
              </h4>
              <p className="text-gray-500 pt-3 md:py-3">
                I bring a comprehensive set of skills in both front-end and
                back-end development, including HTML, CSS, JavaScript,
                TypeScript, React, Tailwind, Node.js, and more. I excel at
                designing and maintaining responsive, user-centric websites and
                applications that provide seamless experiences. My expertise
                spans crafting dynamic interfaces, writing clean, efficient
                code, and utilizing the latest tools and technologies to create
                optimized solutions. I thrive in collaborative environments,
                working closely with cross-functional teams to deliver
                exceptional and scalable web applications.
              </p>
            </article>
          </div>
        </main>
      </div>
    </section>
  );
});

AboutMe.displayName = "AboutMe";

export default AboutMe;
