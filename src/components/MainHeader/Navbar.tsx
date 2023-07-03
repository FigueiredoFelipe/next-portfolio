import React from "react";
import NavLink from "./NavLink";

interface NavbarProps {
  links: Array<{ text: string; onClick: () => void }>;
}

export function Navbar({ links }: NavbarProps) {
  return (
    <header className="container flex flex-wrap justify-between p-3 font-Poppins shadow-md max-w-full">
      <div className="container flex flex-wrap">
        <h3 className="text-gray-800 text-xl cursor-pointer font-bold my-3 px-2 md:px-10">
          Felipe.dev
        </h3>
        <nav className="flex gap-6 font-semibold text-base p-4 max-w-fulln ml-auto items-end hidden md:flex">
          {links.map(({ text, onClick }) => (
            <NavLink onClick={onClick} key={text}>
              {text}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
