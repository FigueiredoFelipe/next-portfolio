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
          <a
            className="hover:text-[#075df5] cursor-pointer"
            onClick={handleHomeClick}
          >
            Home
          </a>
          <a
            className="hover:text-[#075df5] cursor-pointer"
            onClick={handleAboutMeClick}
          >
            About
          </a>
          <a
            className="hover:text-[#075df5] cursor-pointer"
            onClick={handlePortfolioClick}
          >
            Projects
          </a>
          <a
            className="hover:text-[#075df5] cursor-pointer"
            onClick={handleContactClick}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
