import { FaHtml5, FaCss3Alt, FaReact } from "react-icons/fa";

import { SiTailwindcss, SiJavascript, SiTypescript } from "react-icons/si";

import { TbBrandNextjs } from "react-icons/tb";

export function TechStack() {
  return (
    <div className="flex flex-col md:flex-row bg-gray-100 justify-center text-2xl leading-6 space-x-1 pt-0 pb-4 md:pb-20 border-red-500 items-center">
      <span className="flex justify-center border-[#2d2e32;] border-b-2 md:border-b-0 md:border-r-2 items-center pr-4 h-6">
        Tech Stack
      </span>
      <div className="flex flex-wrap justify-center space-x-1 py-2 md:py-0 pl-2 ">
        <ul className="flex flex-wrap gap-5 items-center justify-center">
          <li className="bg-white h-16 w-16 rounded-full justify-center items-center flex">
            <FaHtml5 size={40} className="fill-red-500 cursor-pointer" />
          </li>
          <li className="bg-white h-16 w-16 rounded-full justify-center items-center flex">
            <FaCss3Alt size={40} className="fill-blue-500 cursor-pointer" />
          </li>
          <li className="bg-white h-16 w-16 rounded-full justify-center items-center flex">
            <SiJavascript
              size={40}
              className="fill-yellow-400 cursor-pointer"
            />
          </li>
          <li className="bg-white h-16 w-16 rounded-full justify-center items-center flex">
            <SiTypescript size={40} className="fill-blue-500 cursor-pointer" />
          </li>
          <li className="bg-white h-16 w-16 rounded-full justify-center items-center flex">
            <FaReact size={40} className="fill-blue-500 cursor-pointer" />
          </li>
          <li className="bg-white h-16 w-16 rounded-full justify-center items-center flex">
            <SiTailwindcss className="fill-blue-400 cursor-pointer" />
          </li>
          <li className="bg-white h-16 w-16 rounded-full justify-center items-center flex">
            <TbBrandNextjs size={40} className="cursor-pointer" />
          </li>
        </ul>
        {/* <FaHtml5 size={40} className="fill-red-500 cursor-pointer" />
        <FaCss3Alt className="fill-blue-500 cursor-pointer" />
        <SiJavascript className="fill-yellow-400 cursor-pointer" />
        <SiTypescript className="fill-blue-500 cursor-pointer" />
        <FaReact className="fill-blue-500 cursor-pointer" />
        <SiTailwindcss className="fill-blue-400 cursor-pointer" />
        <TbBrandNextjs className="cursor-pointer" /> */}
      </div>
    </div>
  );
}
