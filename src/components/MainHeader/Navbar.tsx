import React from "react";
import NavLink from "./NavLink";

interface NavbarProps {
  handleHomeClick: () => void;
  handleAboutMeClick: () => void;
  handlePortfolioClick: () => void;
  handleContactClick: () => void;
}

export function Navbar({
  handleHomeClick,
  handleAboutMeClick,
  handlePortfolioClick,
  handleContactClick,
}: NavbarProps) {
  return (
    <header className="container flex flex-wrap justify-between p-3 font-Poppins shadow-md max-w-full">
      <div className="container flex flex-wrap">
        <h3 className="text-gray-800 text-xl cursor-pointer font-bold my-3 px-2 md:px-10">
          Felipe.dev
        </h3>
        <nav className="flex gap-6 font-semibold text-base p-4 max-w-fulln ml-auto items-end hidden md:flex">
          <NavLink onClick={handleHomeClick}>Home</NavLink>
          <NavLink onClick={handleAboutMeClick}>About</NavLink>
          <NavLink onClick={handlePortfolioClick}>Portfolio</NavLink>
          <NavLink onClick={handleContactClick}>Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}
