import { FaGithubSquare, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-zinc-900">
      <div className="container mx-auto flex justify-between items-center p-6 md:p-12">
        <div className="text-white text-xs md:text-sm font-semibold">
          <p>Copyright © 2023. All rights reserved.</p>
        </div>
        <div className="text-2xl text-white flex space-x-4">
          <a
            href="https://www.linkedin.com/in/fjnfigueiredo/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin className="fill-white hover:scale-125 transition-transform duration-300" />
          </a>
          <a
            href="https://github.com/FigueiredoFelipe/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <FaGithubSquare className="fill-white hover:scale-125 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </footer>
  );
}