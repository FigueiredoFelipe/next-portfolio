import React from "react";
import NavLink from "./NavLink";

interface NavbarProps {
  links: Array<{ text: string; onClick: () => void }>;
}

export function Navbar({ links }: NavbarProps) {
  return (
    <header className="container flex flex-wrap max-w-full">
      <div className="flex flex-wrap w-full py-6 px-14 text-[#2d2e32;]">
        <h3 className="text-xl cursor-pointer font-bold items-center">
          Felipe.dev
        </h3>
        <nav className="gap-6 font-semibold text-base max-w-full ml-auto items-end hidden md:flex">
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
