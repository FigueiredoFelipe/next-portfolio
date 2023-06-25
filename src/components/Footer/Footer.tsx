import { FaLinkedin, FaGithubSquare } from "react-icons/fa";

export function Footer() {
  return (
    <>
      <footer className="bg-gray-800">
        <div className="container mx-auto flex justify-center max-w-full p-6 md:p-12">
          <div className="max-w-full md:max-w-3/5">
            <p className="text-white text-xs md:text-sm">
              Copyright © 2023. All rights reserved.
            </p>
          </div>
          <div className="text-2xl text-white flex space-x-2 pl-6 md:pl-20">
            <a
              href="https://www.linkedin.com/in/fjnfigueiredo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="fill-white hover:scale-125 duration-300" />
            </a>
            <a
              href="https://github.com/FigueiredoFelipe/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithubSquare className="fill-white hover:scale-125 duration-300" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
