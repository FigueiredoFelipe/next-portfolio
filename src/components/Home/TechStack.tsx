import { FaHtml5, FaCss3Alt, FaReact } from "react-icons/fa";

import { SiTailwindcss, SiJavascript, SiTypescript } from "react-icons/si";

import { TbBrandNextjs } from "react-icons/tb";

export function TechStack() {
  return (
    <div className="flex flex-col md:flex-row bg-gray-100 dark:bg-[#363636] justify-center text-2xl leading-6 space-x-1 pt-0 pb-4 md:pb-20 border-red-500 items-center">
      <span className="flex justify-center border-[#2d2e32;] border-b-2 md:border-b-0 md:border-r-2 items-center pr-0 md:pr-4 h-6">
        Tech Stack
      </span>
      <div className="flex flex-wrap justify-center space-x-1 py-2 md:py-0 pl-2 ">
        <ul className="flex flex-wrap gap-2 md:gap items-center justify-center">
          <li className="bg-white dark:bg-zinc-300 h-14 w-14 md:h-16 md:w-16 rounded-full justify-center items-center flex shadow-custom">
            <FaHtml5
              aria-label="HTML5"
              size={40}
              className="fill-red-500 cursor-pointer"
            />
          </li>
          <li className="bg-white dark:bg-zinc-300 h-14 w-14 md:h-16 md:w-16 rounded-full justify-center items-center flex shadow-custom">
            <FaCss3Alt
              aria-label="CSS3"
              size={40}
              className="fill-blue-500 cursor-pointer"
            />
          </li>
          <li className="bg-white dark:bg-zinc-300 h-14 w-14 md:h-16 md:w-16 rounded-full justify-center items-center flex shadow-custom">
            <SiJavascript
              aria-label="JavaScript"
              size={36}
              className="fill-yellow-400 cursor-pointer"
            />
          </li>
          <li className="bg-white dark:bg-zinc-300 h-14 w-14 md:h-16 md:w-16 rounded-full justify-center items-center flex shadow-custom">
            <SiTypescript
              aria-label="TypeScript"
              size={36}
              className="fill-blue-500 cursor-pointer"
            />
          </li>
          <li className="bg-white dark:bg-zinc-300 h-14 w-14 md:h-16 md:w-16 rounded-full justify-center items-center flex shadow-custom">
            <FaReact
              aria-label="React"
              size={40}
              className="fill-blue-500 cursor-pointer"
            />
          </li>
          <li className="bg-white dark:bg-zinc-300 h-14 w-14 md:h-16 md:w-16 rounded-full justify-center items-center flex shadow-custom">
            <SiTailwindcss
              aria-label="Tailwind"
              className="fill-blue-400 cursor-pointer"
            />
          </li>
          <li className="bg-white dark:bg-zinc-300 h-14 w-14 md:h-16 md:w-16 rounded-full justify-center items-center flex shadow-custom">
            <TbBrandNextjs
              aria-label="Next.js"
              size={40}
              className="text-black cursor-pointer"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
