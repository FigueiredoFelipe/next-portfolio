import React from "react";
import NavLink from "./NavLink";

interface NavbarProps {
  links: Array<{ text: string; onClick: () => void }>;
}

export function Navbar({ links }: NavbarProps) {
  return (
    <header className="container flex flex-wrap max-w-full">
      <div className="flex flex-wrap w-full py-6 px-14 shadow-custom">
        <h3 className="text-[1.3rem] cursor-pointer font-bold items-center">
          Felipe.dev
        </h3>
        <nav className="gap-5 font-semibold text-[1.048rem] max-w-full ml-auto items-end hidden md:flex">
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
